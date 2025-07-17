<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
    <div class="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">

      <!-- Left Section (Image and Text) -->
      <div class="relative lg:w-1/2 bg-cover bg-center rounded-l-2xl p-8 flex flex-col justify-between"
           :style="{ backgroundImage: `url('https://placehold.co/800x600/3A2D4A/FFFFFF?text=Capturing+Moments')` }">
        <!-- Overlay for better text readability and gradient effect -->
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent rounded-l-2xl"></div>

        <!-- Top Left Logo and Back to Website Button -->
        <div class="relative z-10 flex justify-between items-start">
          <div class="text-white text-2xl font-bold rounded-md py-1 px-2">
            <span class="text-purple-300">AMU</span>
          </div>
          <v-btn
            text
            class="text-white rounded-full px-4 py-2 text-sm normal-case"
            prepend-icon="mdi-arrow-left"
            @click="goBackToWebsite"
            variant="text"
            color="white"
          >
            Back to website
          </v-btn>
        </div>

        <!-- Bottom Text -->
        <div class="relative z-10 text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8">
          Capturing Moments, <br>Creating Memories
        </div>
      </div>

      <!-- Right Section (Sign Up Form) -->
      <div class="lg:w-1/2 bg-gray-900 p-8 sm:p-12 lg:p-16 flex flex-col justify-center rounded-r-2xl">
        <h2 class="text-white text-3xl sm:text-4xl font-bold mb-2">Create an account</h2>
        <p class="text-gray-400 text-sm mb-8">
          Already have an account?
          <router-link to="/login" class="text-purple-500 hover:text-purple-400 font-medium">Log in</router-link>
        </p>

        <form @submit.prevent="handleSignUp">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <v-text-field
              v-model="firstName"
              label="First name"
              variant="outlined"
              density="comfortable"
              class="rounded-lg custom-input"
              bg-color="gray-800"
              color="purple-500"
              hide-details
              clearable
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              label="Last name"
              variant="outlined"
              density="comfortable"
              class="rounded-lg custom-input"
              bg-color="gray-800"
              color="purple-500"
              hide-details
              clearable
            ></v-text-field>
          </div>

          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            variant="outlined"
            density="comfortable"
            class="rounded-lg custom-input mb-4"
            bg-color="gray-800"
            color="purple-500"
            hide-details
            clearable
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Enter your password"
            :type="showPassword ? 'text' : 'password'"
            variant="outlined"
            density="comfortable"
            class="rounded-lg custom-input mb-4"
            bg-color="gray-800"
            color="purple-500"
            hide-details
            clearable
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>

          <v-checkbox
            v-model="agreeToTerms"
            color="purple-500"
            class="mb-6 custom-checkbox"
            hide-details
          >
            <template v-slot:label>
              <span class="text-gray-400 text-sm">I agree to the
                <a href="#" class="text-purple-500 hover:text-purple-400 font-medium">Terms & Conditions</a>
              </span>
            </template>
          </v-checkbox>

          <v-btn
            type="submit"
            block
            color="purple-600"
            size="large"
            class="rounded-lg font-bold text-white mb-6 hover:bg-purple-700 transition-colors duration-300 normal-case"
            :disabled="!agreeToTerms"
          >
            Create account
          </v-btn>
        </form>

        <div class="relative flex items-center justify-center mb-6">
          <div class="flex-grow border-t border-gray-700"></div>
          <span class="flex-shrink mx-4 text-gray-500 text-sm">Or register with</span>
          <div class="flex-grow border-t border-gray-700"></div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <v-btn
            block
            size="large"
            class="rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors duration-300 normal-case"
            prepend-icon="mdi-google"
            bg-color="gray-900"
            @click="signInWithGoogle"
            variant="outlined"
            color="gray-700"
          >
            Google
          </v-btn>
          <v-btn
            block
            size="large"
            class="rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors duration-300 normal-case"
            prepend-icon="mdi-apple"
            bg-color="gray-990"
            @click="signInWithApple"
            variant="outlined"
            color="gray-700"
          >
            Apple
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Reactive variables for form fields
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const agreeToTerms = ref(false);
const showPassword = ref(false); // For toggling password visibility

const router = useRouter();

// Function to handle sign up form submission
const handleSignUp = () => {
  if (agreeToTerms.value) {
    console.log('Sign Up Data:', {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      agreeToTerms: agreeToTerms.value,
    });
    // In a real application, you would send this data to your backend API
    // e.g., fetch('/api/signup', { method: 'POST', body: JSON.stringify(...) })
    alert('Sign up form submitted! (Check console for data)'); // Using alert for demo, replace with proper UI feedback
    // router.push('/dashboard'); // Redirect to a dashboard or success page
  } else {
    alert('Please agree to the Terms & Conditions.'); // Using alert for demo, replace with proper UI feedback
  }
};

// Functions for social sign-in
const signInWithGoogle = () => {
  alert('Signing in with Google...'); // Using alert for demo, replace with proper UI feedback
  // Implement Google OAuth logic here
};

const signInWithApple = () => {
  alert('Signing in with Apple...'); // Using alert for demo, replace with proper UI feedback
  // Implement Apple OAuth logic here
};

// Function to navigate back to a hypothetical website homepage
const goBackToWebsite = () => {
  router.push('/'); // Navigate to the root or a specific homepage route
};
</script>

<style scoped>
/* Scoped styles for this component */
/* Custom styling for Vuetify components can be done here or via props/Tailwind */

/* Override default Vuetify input border color on focus if needed */
.v-text-field.v-input--density-comfortable .v-field__outline {
  border-color: var(--v-theme-purple-500) !important; /* Example, adjust as needed */
}

/* Ensure font-inter is applied */
.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Custom styles to match the screenshot's input field appearance */
.custom-input .v-field__outline {
  border-width: 1px !important; /* Adjust border thickness */
  border-color: #4B5563 !important; /* Gray-600 equivalent for borders */
}

.custom-input .v-field__input {
  color: #E5E7EB !important; /* Text color inside input */
}

.custom-input .v-label {
  color: #9CA3AF !important; /* Label color */
}

/* Custom styles for checkbox to match screenshot */
.custom-checkbox .v-label {
    color: #9CA3AF !important; /* Label color */
}

.custom-checkbox .v-selection-control__wrapper {
    color: #8B5CF6 !important; /* Checkbox color */
}

/* Adjust button text capitalization if needed */
.normal-case {
  text-transform: none !important;
}

/* Custom background for Apple button to match screenshot's darker shade */
.bg-gray-990 {
  background-color: #1a1a1a !important; /* Slightly darker than gray-900 */
}
</style>
