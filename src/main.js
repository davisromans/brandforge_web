// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // If you chose Vue Router
import { createPinia } from 'pinia' // If you chose Pinia

// Vuetify
import 'vuetify/styles' // Import Vuetify's core styles
import './assets/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components' // Import all Vuetify components
import * as directives from 'vuetify/directives' // Import all Vuetify directives
import '@mdi/font/css/materialdesignicons.css' // Optional: Material Design Icons (highly recommended for Vuetify)

const vuetify = createVuetify({
    theme: {
    defaultTheme: 'dark',
    //
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Important for using Material Design Icons
  },
  // Other Vuetify options (e.g., custom themes, defaults) can go here
})

const app = createApp(App)

app.use(createPinia()) // Use Pinia (if chosen)
app.use(router) // Use Vue Router (if chosen)
app.use(vuetify) // Use Vuetify

// --- NEW: Google Identity Services Initialization in main.js ---
// Define the global callback function for GSI.
// It dispatches a custom event that AuthPage/SignUp components listen for.
window.handleGoogleCredentialResponse = (response) => {
  const event = new CustomEvent('google-credential-response', { detail: response });
  window.dispatchEvent(event);
  console.log('Global GSI callback triggered in main.js');
};

// Polling for window.google to be available and then initialize GSI
// This ensures GSI is ready before its initialize method is called.
const initGoogleSignIn = () => {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Use environment variable
      callback: window.handleGoogleCredentialResponse, // Refer to the globally defined callback
      auto_select: false, // Prevents automatic sign-in on page load
    });
    console.log('Google Identity Services initialized in main.js with client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
  } else {
    // If window.google is not yet available, try again after a short delay
    setTimeout(initGoogleSignIn, 100);
  }
};

initGoogleSignIn(); // Start the GSI initialization process when the app starts

app.mount('#app')
