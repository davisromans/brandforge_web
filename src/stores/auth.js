import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router'; // Import useRouter

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter(); // Access router within the store

  // When using persistedstate, these will be automatically hydrated
  const user = ref(null);
  const token = ref(null);
  const isLoggedIn = computed(() => !!token.value);

  // Function to set user data and token in memory
  // The plugin will automatically save this to sessionStorage
  const setAuthData = (userData, userToken) => {
    user.value = userData;
    token.value = userToken;
  };

  // Function to clear user data and token from memory
  // The plugin will automatically clear this from sessionStorage
  const clearAuthData = () => {
    user.value = null;
    token.value = null;
  };

  const userInitials = computed(() => {
    if (user.value && user.value.firstName && user.value.lastName) {
      return `${user.value.firstName.charAt(0)}${user.value.lastName.charAt(0)}`;
    }
    if (user.value && user.value.firstName) {
      return user.value.firstName.charAt(0);
    }
    return ''; // Or a default like 'JD' if no name is available
  });

  async function login(identifier, password) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (data.success) {
        setAuthData(data.user, data.token);
        alert('Login successful!');
        router.push('/homepage');
        return { success: true };
      } else {
        alert(`Login failed: ${data.message}`);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error during login request:', error);
      alert('An error occurred during login. Please try again.');
      return { success: false, message: 'Network error or server unreachable.' };
    }
  }

  async function signup(userData) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/register-initial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        if (data.action === 'validate account') {
          user.value = data.user; // Store user data in memory for OTP
          return { success: true, action: 'verify-otp' };
        } else {
          setAuthData(data.user, data.token);
          router.push('/homepage');
          return { success: true, action: 'logged-in' };
        }
      } else {
        alert(`Sign up failed: ${data.message}`);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error during sign up request:', error);
      alert('An error occurred during sign up. Please try again.');
      return { success: false, message: 'Network error or server unreachable.' };
    }
  }

  async function verifyOtp(phoneNumber, otpCode) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp: otpCode }),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        setAuthData(data.user, data.token);
        router.push('/homepage');
        return { success: true };
      } else {
        alert(`OTP verification failed: ${data.message}`);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error during OTP verification request:', error);
      alert('An error occurred during OTP verification. Please try again.');
      return { success: false, message: 'Network error or server unreachable.' };
    }
  }

  async function resendOtp(phoneNumber) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await res.json();
      if (data.success) {
        alert('New OTP sent to your phone number!');
        return { success: true };
      } else {
        alert(`Failed to resend OTP: ${data.message}`);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('An error occurred while trying to resend OTP.');
      return { success: false, message: 'Network error or server unreachable.' };
    }
  }

  async function socialAuth(authData) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/social`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setAuthData(data.user, data.token);
        router.push('/homepage');
        return { success: true };
      } else {
        alert(`${authData.provider} Sign-in failed: ${data.message}`);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error(`Error sending ${authData.provider} credential to backend:`, error);
      alert(`An error occurred during ${authData.provider} Sign-in.`);
      return { success: false, message: 'Network error or server unreachable.' };
    }
  }

  async function updateProfile(profileUpdates) {
    try {
      // In a real app, you'd send this to your backend
      user.value = { ...user.value, ...profileUpdates };
      alert('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
      return { success: false, message: 'Failed to update profile.' };
    }
  }

  function logout() {
    clearAuthData();
    alert('Logged out successfully!');
    router.push('/'); // Redirect to login/auth page
  }

  return {
    user,
    token,
    isLoggedIn,
    userInitials,
    login,
    signup,
    verifyOtp,
    resendOtp,
    socialAuth,
    updateProfile,
    logout,
  };
}, {
  // Configure persistence for this store
  persist: {
    enabled: true,
    strategies: [
      { storage: sessionStorage } // Use sessionStorage
    ],
  },
});
