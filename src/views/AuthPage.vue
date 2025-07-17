<template>
  <div class="auth-page-wrapper">
    <div class="main-container">

      <div class="left-section">
        <v-carousel
          v-model="currentCarouselIndex"
          cycle
          height="100%"
          hide-delimiter-background
          :show-arrows="false"
          :interval="5000"
          :touch="{
            left: () => {},
            right: () => {},
          }"
          class="auth-carousel"
        >
          <v-carousel-item
            v-for="(item, i) in carouselItems"
            :key="i"
            :src="item.src"
            cover
          ></v-carousel-item>
        </v-carousel>

        <div class="overlay-content">
          <div class="top-content">
            <div class="logo-text">
              <span class="logo-color">BrandForge</span>
            </div>
            <v-btn
              text
              class="back-button"
              append-icon="mdi-arrow-right"
              @click="goBackToWebsite"
              variant="text"
              color="white"
            >
              Go to Website
            </v-btn>
          </div>

          <div class="bottom-text-container">
            <div class="bottom-text">
              Smart Design, <br>Seamless Experience
            </div>
            <div class="auth-carousel-indicators">
              <v-btn
                v-for="(item, i) in carouselItems"
                :key="i"
                :class="{ 'v-btn--active': i === currentCarouselIndex }"
                class="carousel-indicator-btn"
                @click="currentCarouselIndex = i"
                icon
                size="x-small"
              ></v-btn>
            </div>
          </div>
        </div>
      </div>

      <div class="right-section">
        <h2 class="form-title">Welcome back!</h2>
        <p class="form-subtitle">
          Don't have an account yet?
          <router-link to="/signup" class="login-link">Sign up</router-link>
        </p>

        <form @submit.prevent="handleLogin">
          <v-text-field
            v-model="loginIdentifier"
            label="Email or Phone Number"
            type="text"
            variant="outlined"
            density="comfortable"
            class="custom-input form-field-margin"
            bg-color="#2D2D2D"
            color="#8B5CF6"
            hide-details
            clearable
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Enter your password"
            :type="showPassword ? 'text' : 'password'"
            variant="outlined"
            density="comfortable"
            class="custom-input form-field-margin"
            bg-color="#2D2D2D"
            color="#8B5CF6"
            hide-details
            clearable
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>

          <div class="d-flex justify-end mb-4">
            <router-link to="/forgot-password" class="terms-link">Forgot password?</router-link>
          </div>

          <v-btn
            type="submit"
            block
            color="#7C3AED"
            size="large"
            class="create-account-button"
          >
            Log in
          </v-btn>
        </form>

        <div class="separator-container">
          <div class="separator-line"></div>
          <span class="separator-text">Or log in with</span>
          <div class="separator-line"></div>
        </div>

        <div class="social-buttons-container-vertical">
          <v-btn
            block
            size="large"
            class="social-button"
            prepend-icon="mdi-google"
            bg-color="#1a1a1a"
            @click="signInWithGoogle"
            variant="outlined"
            color="#4B5563"
          >
            Google
          </v-btn>
          <v-btn
            block
            size="large"
            class="social-button apple-button"
            prepend-icon="mdi-apple"
            bg-color="#1a1a1a"
            @click="signInWithApple"
            variant="outlined"
            color="#4B5563"
          >
          Apple
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import auth1 from '@/assets/auth1.jpg';
import auth2 from '@/assets/auth2.jpg';
import auth3 from '@/assets/auth3.jpg';

const loginIdentifier = ref('');
const password = ref('');
const showPassword = ref(false);
const currentCarouselIndex = ref(0);

const router = useRouter();

const carouselItems = ref([
  { src: auth1 },
  { src: auth2 },
  { src: auth3 },
]);

const handleLogin = async () => {
  if (!loginIdentifier.value || !password.value) {
    alert('Please enter both email/phone number and password.');
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: loginIdentifier.value,
        password: password.value,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert('Login successful!');
      localStorage.setItem('token', data.token);
      router.push('/homepage');
    } else {
      alert(`Login failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Error during login request:', error);
    alert('An error occurred during login. Please try again.');
  }
};

let googleInitInterval = null; // To hold the interval ID for GSI polling

// Function to handle Google Sign-In
const signInWithGoogle = () => {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.prompt(); // Trigger the One Tap or pop-up
  } else {
    alert('Google Sign-In functionality is not ready. Please wait a moment and try again.');
  }
};

// This function will be called by the global window.onload callback (via custom event)
const handleGoogleCredentialResponse = async (event) => {
  const response = event.detail; // Access the response from the custom event detail
  console.log('Encoded JWT ID token: ' + response.credential);
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/social`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: response.credential,
        provider: 'google',
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert(data.message);
      localStorage.setItem('token', data.token);
      router.push('/homepage');
    } else {
      alert(`Google Sign-in failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Error sending Google credential to backend:', error);
    alert('An error occurred during Google Sign-in.');
  }
};

// Function to handle Apple Sign-In
const signInWithApple = () => {
  if (window.AppleID && window.AppleID.auth) {
    window.AppleID.auth.signIn()
      .then((response) => {
        console.log('Apple Sign-In Response:', response);
        sendAppleAuthCodeToBackend(response.authorization);
      })
      .catch((error) => {
        console.error('Apple Sign-In failed:', error);
        alert('Apple Sign-In was cancelled or failed.');
      });
  } else {
    alert('Apple Sign-In script not loaded yet. Please try again.');
  }
};

// Function to send Apple authorization data to your backend
const sendAppleAuthCodeToBackend = async (authorization) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/social`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            code: authorization.code,
            id_token: authorization.id_token,
            name: authorization.user?.name ? `${authorization.user.name.firstName || ''} ${authorization.user.name.lastName || ''}`.trim() : undefined,
            email: authorization.user?.email || undefined,
            provider: 'apple',
        }),
    });

    const data = await res.json();
    if (data.success) {
      alert(data.message);
      localStorage.setItem('token', data.token);
      router.push('/homepage');
    } else {
      alert(`Apple Sign-in failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Error sending Apple authorization to backend:', error);
    alert('An error occurred during Apple Sign-in.');
  }
};

const goBackToWebsite = () => {
  router.push('/homepage');
};

onMounted(() => {
  // Listen for the custom event dispatched from public/index.html's window.onload
  window.addEventListener('google-credential-response', handleGoogleCredentialResponse);

  // Poll for the Google Identity Services library to be ready
  googleInitInterval = setInterval(() => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      // GSI is ready, clear the interval
      clearInterval(googleInitInterval);
      console.log('Google Identity Services detected and ready in AuthPage component.');
    } else {
      // console.log('Waiting for Google Identity Services in AuthPage...'); // Uncomment for detailed debugging
    }
  }, 100); // Check every 100ms
});

onUnmounted(() => {
  window.removeEventListener('google-credential-response', handleGoogleCredentialResponse);
  // Clear the interval if the component unmounts before GSI is ready
  if (googleInitInterval) {
    clearInterval(googleInitInterval);
  }
});
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}

.auth-page-wrapper {
  min-height: 100vh;
  height: 100vh;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
}
@media (min-width: 640px) {
  .auth-page-wrapper {
    padding: 1.5rem;
  }
}
@media (min-width: 1024px) {
  .auth-page-wrapper {
    padding: 2rem;
  }
}

.main-container {
  width: 90%;
  max-width: 1200px;
  background-color: #2D2D2D;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: 0;
  height: 100%;
  box-sizing: border-box;
}
@media (min-width: 1024px) {
  .main-container {
    flex-direction: row;
  }
}

.left-section {
  position: relative;
  background-color: #1a1a1a;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  overflow: hidden;
  height: 300px;
  flex-shrink: 0;
  box-sizing: border-box;
}
@media (min-width: 1024px) {
  .left-section {
    width: 50%;
    height: 100%;
    flex-grow: 1;
  }
}

.overlay-content {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
    color: white; /* Ensure text is visible on overlay */
}
@media (min-width: 640px) {
  .overlay-content {
    padding: 2.5rem;
  }
}
@media (min-width: 1024px) {
  .overlay-content {
    padding: 3rem;
  }
}

.top-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.logo-text {
  color: white;
  font-size: 1.5rem;
  font-weight: 900;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.logo-color {
  color: #a78bfa;
}

.back-button {
  color: white;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  text-transform: none !important;
  background-color: rgba(0, 0, 0, 0.3);
}

.bottom-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.bottom-text {
  color: white;
  font-size: 1.875rem;
  font-weight: bold;
  line-height: 1.25;
  margin-bottom: 1rem;
}
@media (min-width: 640px) {
  .bottom-text {
    font-size: 2.25rem;
  }
}
@media (min-width: 1024px) {
  .bottom-text {
    font-size: 3rem;
  }
}

.right-section {
  background-color: #1a1a1a;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  flex-grow: 1;
  overflow-y: auto;
  box-sizing: border-box;
  min-height: 0;
}
@media (min-width: 640px) {
  .right-section {
    padding: 3rem;
  }
}
@media (min-width: 1024px) {
  .right-section {
    width: 50%;
    height: 100%;
    padding: 4rem;
  }
}

.form-title {
  color: white;
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
@media (min-width: 640px) {
  .form-title {
    font-size: 2.25rem;
  }
}

.form-subtitle {
  color: #9CA3AF;
  font-size: 0.875rem;
  margin-bottom: 2rem;
}

.login-link {
  color: #8B5CF6;
  font-weight: 500;
  text-decoration: none;
}
.login-link:hover {
  color: #A78BFA;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}
@media (min-width: 640px) {
  .form-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.form-field-margin {
  margin-bottom: 1rem;
}

.form-checkbox-margin {
  margin-bottom: 1.5rem;
}

.checkbox-label {
  color: #9CA3AF;
  font-size: 0.875rem;
}

.terms-link {
  color: #8B5CF6;
  font-weight: 500;
  text-decoration: none;
}
.terms-link:hover {
  color: #A78BFA;
}

.create-account-button {
  background-color: #7C3AED !important;
  border-radius: 0.5rem !important;
  font-weight: bold !important;
  color: white !important;
  margin-bottom: 1.5rem !important;
  text-transform: none !important;
  transition: background-color 300ms ease;
}
.create-account-button:hover {
  background-color: #6D28D9 !important;
}

.separator-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.separator-line {
  flex-grow: 1;
  border-top: 1px solid #4B5563;
}

.separator-text {
  flex-shrink: 0;
  margin: 0 1rem;
  color: #6B7280;
  font-size: 0.875rem;
    color: white; /* Ensure text is visible on overlay */
}

.social-buttons-container-vertical {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-button {
  border: 1px solid #4B5563 !important;
  color: #D1D5DB !important;
  border-radius: 0.5rem !important;
  text-transform: none !important;
  transition: background-color 300ms ease;
}
.social-button:hover {
  background-color: #2D2D2D !important;
}

.apple-button {
  background-color: #1a1a1a !important;
}

.custom-input .v-field__outline {
  border-width: 1px !important;
  border-color: #4B5563 !important;
}

.custom-input .v-field__input {
  color: #E5E7EB !important;
}

.custom-input .v-label {
  color: #9CA3AF !important;
}

.custom-checkbox .v-label {
    color: #9CA3AF !important;
}

.custom-checkbox .v-selection-control__wrapper {
    color: #8B5CF6 !important;
}

/* Styles for phone input group (not used on login, but keeping for consistency if needed elsewhere) */
.phone-input-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.phone-input-group .country-code-selector {
  flex-basis: 30%;
  max-width: 120px;
}

.phone-input-group .phone-number-field {
  flex-grow: 1;
}

/* Carousel Indicators Styling */
/* Hide the default Vuetify carousel controls */
.auth-carousel :deep(.v-carousel__controls) {
  display: none !important;
}

/* Custom indicator container */
.auth-carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0;
  margin-top: 2rem;
}

.carousel-indicator-btn {
  min-width: 40px !important;
  width: 40px !important;
  height: 8px !important;
  padding: 0 !important;
  border-radius: 2px !important;
  background-color: rgba(255, 255, 255, 0.5) !important;
  opacity: 1 !important;
  margin: 0 !important;
  transition: width 300ms ease, background-color 300ms ease;
  box-shadow: none !important;
  border: none !important;
}

.carousel-indicator-btn.v-btn--active {
  background-color: white !important;
  width: 60px !important;
}
</style>
