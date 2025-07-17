<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-main class="w-full min-h-screen"> <!-- Ensure v-main takes full width and height -->
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
/* No specific scoped styles needed here, as the layout is handled by Vuetify and Tailwind classes in template. */
/* You can remove any default styles that came with your project's initial setup if they are in this file. */
</style>
