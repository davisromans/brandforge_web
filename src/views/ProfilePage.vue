<template>
  <div class="profile-page-wrapper font-inter">
    <div class="main-container">

      <header class="app-header">
        <div class="logo-text">
          <span class="logo-color">BrandForge</span> AI
        </div>
        <v-btn
          text
          class="back-button"
          prepend-icon="mdi-arrow-left"
          @click="goBackToHome"
          variant="text"
          color="white"
        >
          Back to Home
        </v-btn>
      </header>

      <div class="content-area">
        <h1 class="page-title">My Profile</h1>
        <p class="page-subtitle">Manage your account information and preferences.</p>

        <div class="profile-card">
          <div class="profile-avatar-section">
            <v-avatar size="100" color="#8B5CF6" class="profile-avatar">
              <span class="text-white text-h5">{{ authStore.userInitials }}</span>
            </v-avatar>
            <v-btn
              class="change-avatar-button"
              variant="text"
              color="#A78BFA"
              size="small"
              prepend-icon="mdi-camera"
              @click="changeProfilePicture"
            >
              Change Photo
            </v-btn>
          </div>

          <div class="profile-details-section">
            <h3 class="section-heading">Personal Information</h3>
            <v-text-field
              v-model="userProfile.firstName"
              label="First Name"
              variant="outlined"
              density="comfortable"
              class="custom-input form-field-margin"
              bg-color="#1a1a1a"
              color="#8B5CF6"
              hide-details
              clearable
            ></v-text-field>
            <v-text-field
              v-model="userProfile.lastName"
              label="Last Name"
              variant="outlined"
              density="comfortable"
              class="custom-input form-field-margin"
              bg-color="#1a1a1a"
              color="#8B5CF6"
              hide-details
              clearable
            ></v-text-field>
            <v-text-field
              v-model="userProfile.email"
              label="Email"
              type="email"
              variant="outlined"
              density="comfortable"
              class="custom-input form-field-margin"
              bg-color="#1a1a1a"
              color="#8B5CF6"
              hide-details
              clearable
              readonly
            ></v-text-field>
            <v-text-field
              v-model="userProfile.phoneNumber"
              label="Phone Number"
              type="tel"
              variant="outlined"
              density="comfortable"
              class="custom-input form-field-margin"
              bg-color="#1a1a1a"
              color="#8B5CF6"
              hide-details
              clearable
              readonly
            ></v-text-field>

            <h3 class="section-heading mt-6">Account Settings</h3>
            <v-text-field
              v-model="userProfile.password"
              label="Change Password"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              density="comfortable"
              class="custom-input form-field-margin"
              bg-color="#1a1a1a"
              color="#8B5CF6"
              hide-details
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              v-model="userProfile.confirmPassword"
              label="Confirm New Password"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              density="comfortable"
              class="custom-input form-field-margin"
              bg-color="#1a1a1a"
              color="#8B5CF6"
              hide-details
            ></v-text-field>

            <v-radio-group v-model="userProfile.notificationsEnabled" class="form-field-margin">
                <template v-slot:label>
                    <span class="radio-checkbox-label">Email Notifications:</span>
                </template>
                <v-radio label="On" :value="true" color="#8B5CF6"></v-radio>
                <v-radio label="Off" :value="false" color="#8B5CF6"></v-radio>
            </v-radio-group>

            <v-select
                v-model="userProfile.language"
                :items="languages"
                label="Preferred Language"
                variant="outlined"
                density="comfortable"
                class="custom-input form-field-margin"
                bg-color="#1a1a1a"
                color="#8B5CF6"
                hide-details
            ></v-select>

            <v-btn
              block
              color="#7C3AED"
              size="large"
              class="save-changes-button mt-4"
              @click="saveChanges"
            >
              Save Changes
              <v-icon right>mdi-content-save</v-icon>
            </v-btn>

            <v-btn
              block
              color="red-darken-2"
              size="large"
              class="delete-account-button mt-4"
              variant="outlined"
              @click="confirmDeleteAccount"
            >
              Delete Account
              <v-icon right>mdi-delete</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // Import the auth store

const router = useRouter();
const authStore = useAuthStore(); // Initialize the auth store

// Initialize userProfile with data from the store if available
const userProfile = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  notificationsEnabled: true,
  language: 'English',
});

// Watch for changes in the auth store's user object and update userProfile
watch(() => authStore.user, (newUser) => {
  if (newUser) {
    userProfile.firstName = newUser.firstName || '';
    userProfile.lastName = newUser.lastName || '';
    userProfile.email = newUser.email || '';
    userProfile.phoneNumber = newUser.phoneNumber || '';
    // Do not set password or confirmPassword from store directly
  } else {
    // Clear profile if user logs out
    userProfile.firstName = '';
    userProfile.lastName = '';
    userProfile.email = '';
    userProfile.phoneNumber = '';
    userProfile.password = '';
    userProfile.confirmPassword = '';
  }
}, { immediate: true }); // Run immediately to populate on mount if user is already logged in

const showPassword = ref(false);
const languages = ['English', 'Swahili', 'French', 'German'];

const goBackToHome = () => {
  router.push('/homepage');
};

const changeProfilePicture = () => {
  alert('Functionality to change profile picture would be implemented here.');
};

const saveChanges = async () => {
  // Basic validation for password change
  if (userProfile.password && userProfile.password !== userProfile.confirmPassword) {
    alert('New password and confirm password do not match.');
    return;
  }

  // Prepare data to send to the store (and potentially backend)
  const updates = {
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    notificationsEnabled: userProfile.notificationsEnabled,
    language: userProfile.language,
  };

  if (userProfile.password) {
    updates.password = userProfile.password;
  }

  // Dispatch updateProfile action from the store
  const result = await authStore.updateProfile(updates);

  if (result.success) {
    // Clear password fields after successful save
    userProfile.password = '';
    userProfile.confirmPassword = '';
  }
};

const confirmDeleteAccount = () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    alert('Account deletion initiated. (This is a placeholder action)');
    // In a real application, you would call your backend API to delete the account
    authStore.logout(); // Then log out the user via store action
  }
};
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}

.profile-page-wrapper {
  min-height: 100vh;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
  overflow-y: auto;
}

.main-container {
  width: 100%;
  max-width: 1400px;
  background-color: #2D2D2D;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  padding: 2rem;
  flex-grow: 1;
}
@media (min-width: 768px) {
  .main-container {
    padding: 3rem;
  }
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid #4B5563;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo-text {
  color: white;
  font-size: 1.8rem;
  font-weight: 900;
  padding: 0.25rem 0.5rem;
}

.logo-color {
  color: #a78bfa;
}

.back-button {
  color: #D1D5DB !important;
  text-transform: none !important;
  font-weight: 500 !important;
  border-radius: 0.5rem !important;
  padding: 0.5rem 1rem !important;
  transition: background-color 0.3s ease;
}
.back-button:hover {
  background-color: rgba(139, 92, 246, 0.1) !important;
  color: #8B5CF6 !important;
}

.content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.page-title {
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
@media (min-width: 768px) {
  .page-title {
    font-size: 3.5rem;
  }
}

.page-subtitle {
  color: #9CA3AF;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.profile-card {
  background-color: #1a1a1a;
  border-radius: 1rem;
  padding: 2.5rem;
  border: 1px solid #4B5563;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.profile-avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.profile-avatar {
  margin-bottom: 1rem;
}

.change-avatar-button {
  text-transform: none !important;
  font-weight: 500 !important;
}

.profile-details-section {
  width: 100%;
  text-align: left;
}

.section-heading {
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #4B5563;
  padding-bottom: 0.5rem;
}

.form-field-margin {
  margin-bottom: 1rem;
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

.radio-checkbox-label,
.v-radio :deep(.v-label),
.v-checkbox :deep(.v-label) {
  color: #E5E7EB !important;
  font-size: 0.875rem;
}

.save-changes-button {
  background-color: #7C3AED !important;
  border-radius: 0.5rem !important;
  font-weight: bold !important;
  color: white !important;
  text-transform: none !important;
  transition: background-color 0.3s ease;
}
.save-changes-button:hover {
  background-color: #6D28D9 !important;
}

.delete-account-button {
  border-radius: 0.5rem !important;
  font-weight: bold !important;
  text-transform: none !important;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.delete-account-button:hover {
  background-color: rgba(255, 0, 0, 0.1) !important;
  color: #EF5350 !important; /* Lighter red on hover */
}
</style>
