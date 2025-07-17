// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import './assets/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    theme: {
    defaultTheme: 'dark',
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

window.handleGoogleCredentialResponse = (response) => {
  const event = new CustomEvent('google-credential-response', { detail: response });
  window.dispatchEvent(event);
  console.log('Global GSI callback triggered in main.js');
};

const initGoogleSignIn = () => {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: window.handleGoogleCredentialResponse,
      auto_select: false,
    });
    console.log('Google Identity Services initialized in main.js with client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);

    // NEW: Render the Google Sign-In button if the element exists
    // This will render Google's button directly, which might be more stable.
    const googleButtonDiv = document.getElementById('google-signin-button');
    if (googleButtonDiv) {
      window.google.accounts.id.renderButton(
        googleButtonDiv,
        {
          type: 'standard', // or 'icon'
          size: 'large',
          text: 'signin_with', // or 'continue_with', 'signup_with'
          shape: 'pill', // or 'rectangular', 'square', 'circle'
          theme: 'outline', // or 'filled_blue', 'filled_black'
          locale: 'en', // dynamically set if needed
        }
      );
      console.log('Google Sign-In button rendered.');
    }
  } else {
    setTimeout(initGoogleSignIn, 100);
  }
};

initGoogleSignIn();

app.mount('#app')
