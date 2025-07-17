// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}", // Ensure this scans your Vue components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
