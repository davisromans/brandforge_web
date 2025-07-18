<template>
  <div class="otp-page-wrapper font-inter">
    <div class="otp-container">
      <h2 class="otp-title">Verify Your Account</h2>
      <p class="otp-subtitle">
        Please enter the 6-digit OTP sent to your phone number:
        <span class="text-purple-400">{{ phoneNumberDisplay }}</span>
      </p>

      <form @submit.prevent="handleOtpVerification">
        <v-otp-input
          v-model="otp"
          length="6"
          type="number"
          variant="outlined"
          density="comfortable"
          class="otp-input"
          color="#8B5CF6"
        ></v-otp-input>

        <v-btn
          type="submit"
          block
          color="#7C3AED"
          size="large"
          class="verify-button"
          :disabled="otp.length !== 6"
        >
          Verify
        </v-btn>

        <p class="resend-text">
          Didn't receive the code?
          <a href="#" class="terms-link" @click.prevent="resendOtp">Resend OTP</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // No need for useRouter here directly, as store handles navigation
import { useAuthStore } from '@/stores/auth'; // Import the auth store

const route = useRoute();
const otp = ref('');
const phoneNumber = ref('');
const phoneNumberDisplay = ref('');

const authStore = useAuthStore(); // Initialize the auth store

onMounted(() => {
  if (route.query.phone) {
    phoneNumber.value = route.query.phone;
    phoneNumberDisplay.value = route.query.phone; // Display the phone number from query
  } else {
    alert('Phone number not provided for OTP verification. Redirecting to signup.');
    authStore.router.push('/signup'); // Use router from store
  }
});

const handleOtpVerification = async () => {
  if (otp.value.length !== 6) {
    alert('Please enter the full 6-digit OTP.');
    return;
  }

  // Dispatch verifyOtp action from the store
  await authStore.verifyOtp(phoneNumber.value, otp.value);
  // Redirection is handled inside the store action, so no need for router.push here
};

const resendOtp = async () => {
  // Dispatch resendOtp action from the store
  await authStore.resendOtp(phoneNumber.value);
};
</script>

<style scoped>
.otp-page-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  font-family: 'Inter', sans-serif;
}

.otp-container {
  background-color: #2D2D2D;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.otp-title {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.otp-subtitle {
  color: #9CA3AF;
  font-size: 1rem;
  margin-bottom: 2rem;
}

/* Styles for v-otp-input */
.otp-input :deep(.v-field__input) input {
  text-align: center !important;
  font-size: 1.5rem !important;
  font-weight: bold !important;
  color: white !important;
}

.otp-input :deep(.v-field__outline) {
  border-color: #4B5563 !important;
  border-width: 1px !important;
}

.otp-input :deep(.v-otp-input__content) {
    gap: 0.5rem; /* Adjust spacing between input boxes */
}

.verify-button {
  background-color: #7C3AED !important;
  border-radius: 0.5rem !important;
  font-weight: bold !important;
  color: white !important;
  margin-top: 2rem !important;
  text-transform: none !important;
  transition: background-color 300ms ease;
}
.verify-button:hover {
  background-color: #6D28D9 !important;
}

.resend-text {
  color: #9CA3AF;
  font-size: 0.9rem;
  margin-top: 1.5rem;
}

.terms-link {
  color: #8B5CF6;
  font-weight: 500;
  text-decoration: none;
}
.terms-link:hover {
  color: #A78BFA;
}
</style>
