<template>
  <div class="auth-page-wrapper">
    <div class="main-container">

      <div class="left-section">
        <v-carousel v-model="currentCarouselIndex" cycle height="100%" hide-delimiter-background :show-arrows="false"
          :interval="5000" :touch="{
            left: () => { },
            right: () => { },
          }" class="auth-carousel">
          <v-carousel-item v-for="(item, i) in carouselItems" :key="i" :src="item.src" cover></v-carousel-item>
        </v-carousel>

        <div class="overlay-content">
          <div class="top-content">
            <div class="logo-text">
              <span class="logo-color">BrandForge</span>
            </div>
            <v-btn text class="back-button" append-icon="mdi-arrow-right" @click="goBackToWebsite" variant="text"
              color="white">
              Go to website
            </v-btn>
          </div>

          <div class="bottom-text-container">
            <div class="bottom-text">
              Smart Design, <br>Seamless Experience
            </div>
            <div class="auth-carousel-indicators">
              <v-btn v-for="(item, i) in carouselItems" :key="i"
                :class="{ 'v-btn--active': i === currentCarouselIndex }" class="carousel-indicator-btn"
                @click="currentCarouselIndex = i" icon size="x-small"></v-btn>
            </div>
          </div>
        </div>
      </div>

      <div class="right-section">
        <h2 class="form-title">Create an account</h2>
        <p class="form-subtitle">
          Already have an account?
          <router-link to="/" class="login-link">Log in</router-link>
        </p>

        <form @submit.prevent="handleSignUp">
          <div class="form-grid">
            <v-text-field v-model="firstName" label="First name" variant="outlined" density="comfortable"
              class="custom-input" bg-color="#2D2D2D" color="#8B5CF6" hide-details clearable></v-text-field>
            <v-text-field v-model="lastName" label="Last name" variant="outlined" density="comfortable"
              class="custom-input" bg-color="#2D2D2D" color="#8B5CF6" hide-details clearable></v-text-field>
          </div>

          <div class="phone-input-group form-field-margin">
            <v-select v-model="selectedCountryCode" :items="countryCodes" label="Code" variant="outlined"
              density="comfortable" class="custom-input country-code-selector" bg-color="#2D2D2D" color="#8B5CF6"
              hide-details required></v-select>
            <v-text-field v-model="phoneNumber" label="Phone Number" type="tel" variant="outlined" density="comfortable"
              class="custom-input phone-number-field" bg-color="#2D2D2D" color="#8B5CF6" hide-details clearable
              required></v-text-field>
          </div>

          <v-text-field v-model="email" label="Email (Optional)" type="email" variant="outlined" density="comfortable"
            class="custom-input form-field-margin" bg-color="#2D2D2D" color="#8B5CF6" hide-details
            clearable></v-text-field>

          <v-text-field v-model="password" label="Enter your password" :type="showPassword ? 'text' : 'password'"
            variant="outlined" density="comfortable" class="custom-input form-field-margin" bg-color="#2D2D2D"
            color="#8B5CF6" hide-details clearable :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"></v-text-field>

          <v-checkbox v-model="agreeToTerms" color="#8B5CF6" class="custom-checkbox form-checkbox-margin" hide-details>
            <template v-slot:label>
              <span class="checkbox-label">I agree to the
                <a href="#" class="terms-link">Terms & Conditions</a>
              </span>
            </template>
          </v-checkbox>

          <v-btn type="submit" block color="#7C3AED" size="large" class="create-account-button"
            :disabled="!agreeToTerms || !phoneNumber || !password">
            Create account
          </v-btn>
        </form>

        <div class="separator-container">
          <div class="separator-line"></div>
          <span class="separator-text">Or register with</span>
          <div class="separator-line"></div>
        </div>

        <div class="social-buttons-container-vertical">
          <div id="google-signin-button" class="social-button-container"></div>
          <v-btn block size="large" class="social-button apple-button" prepend-icon="mdi-apple" bg-color="#1a1a1a"
            @click="signInWithApple" variant="outlined" color="#4B5563">
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
import { useAuthStore } from '@/stores/auth'; // Import the auth store

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phoneNumber = ref('');
const password = ref('');
const agreeToTerms = ref(false);
const showPassword = ref(false);
const selectedCountryCode = ref('+255');
const currentCarouselIndex = ref(0);

const router = useRouter();
const authStore = useAuthStore(); // Initialize the auth store

const carouselItems = ref([
  { src: auth1 },
  { src: auth2 },
  { src: auth3 },
]);

const countryCodes = [
  { title: 'Tanzania (+255)', value: '+255' },
  { title: 'United States (+1)', value: '+1' },
  { title: 'Canada (+1)', value: '+1' },
  { title: 'United Kingdom (+44)', value: '+44' },
  { title: 'Australia (+61)', value: '+61' },
  { title: 'Germany (+49)', value: '+49' },
  { title: 'France (+33)', value: '+33' },
  { title: 'Japan (+81)', value: '+81' },
  { title: 'India (+91)', value: '+91' },
  { title: 'Brazil (+55)', value: '+55' },
  { title: 'South Africa (+27)', value: '+27' },
];

const handleSignUp = async () => {
  if (!phoneNumber.value) {
    alert('Please enter your phone number.');
    return;
  }
  if (!password.value) {
    alert('Please enter a password.');
    return;
  }
  if (password.value.length < 6) {
    alert('Password must be at least 6 characters long.');
    return;
  }
  if (!agreeToTerms.value) {
    alert('Please agree to the Terms & Conditions.');
    return;
  }

  const fullPhoneNumber = selectedCountryCode.value + phoneNumber.value;

  // Dispatch signup action from the store
  const result = await authStore.signup({
    firstName: firstName.value,
    lastName: lastName.value,
    phoneNumber: fullPhoneNumber,
    email: email.value || null,
    password: password.value,
  });

  if (result.success && result.action === 'verify-otp') {
    router.push(`/verify-otp?phone=${encodeURIComponent(fullPhoneNumber)}`);
  }
  // If result.action is 'logged-in', redirection is handled by the store
};

let googleInitInterval = null;

// The signInWithGoogle function is removed as Google's library will handle the button click.
// const signInWithGoogle = () => {
//   if (window.google && window.google.accounts && window.google.accounts.id) {
//     window.google.accounts.id.prompt();
//   } else {
//     alert('Google Sign-In functionality is not ready. Please wait a moment and try again.');
//   }
// };

// This function will be called by the global window.onload callback (via custom event)
const handleGoogleCredentialResponse = async (event) => {
  const response = event.detail;
  console.log('Encoded JWT ID token: ' + response.credential);
  // Dispatch socialAuth action from the store for Google
  await authStore.socialAuth({
    token: response.credential,
    provider: 'google',
  });
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
  // Dispatch socialAuth action from the store for Apple
  await authStore.socialAuth({
    code: authorization.code,
    id_token: authorization.id_token,
    name: authorization.user?.name ? `${authorization.user.name.firstName || ''} ${authorization.user.name.lastName || ''}`.trim() : undefined,
    email: authorization.user?.email || undefined,
    provider: 'apple',
  });
};

const goBackToWebsite = () => {
  router.push('/');
};

onMounted(() => {
  window.addEventListener('google-credential-response', handleGoogleCredentialResponse);

  // Poll for the Google Identity Services library to be ready
  googleInitInterval = setInterval(() => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      clearInterval(googleInitInterval);
      console.log('Google Identity Services detected and ready in SignUp component.');
      // Manually trigger button rendering in case it wasn't available when main.js ran
      const googleButtonDiv = document.getElementById('google-signin-button');
      if (googleButtonDiv && googleButtonDiv.children.length === 0) { // Only render if not already rendered
        window.google.accounts.id.renderButton(
          googleButtonDiv,
          {
            type: 'standard',
            size: 'large',
            text: 'signup_with', // Changed to signup_with for signup page
            shape: 'pill',
            theme: 'filled_black',
            locale: 'en',
          }
        );
        console.log('Google Sign-In button manually rendered in SignUp component.');
      }
    } else {
      // console.log('Waiting for Google Identity Services in SignUp...');
    }
  }, 100);
});

onUnmounted(() => {
  window.removeEventListener('google-credential-response', handleGoogleCredentialResponse);
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
  color: white;
  /* Ensure text is visible on overlay */
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
  color: white;
  /* Ensure text is visible on overlay */
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

/* Styles for phone input group */
.phone-input-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.phone-input-group .country-code-selector {
  flex-basis: 30%;
  max-width: 180px;
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
