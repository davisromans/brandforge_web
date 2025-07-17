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

app.mount('#app')
