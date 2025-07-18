<template>
  <div class="home-page-wrapper font-inter">
    <div class="main-container">

      <header class="app-header">
        <div class="logo-text">
          <span class="logo-color">BrandForge</span> AI
        </div>
        <div class="header-actions">
          <v-btn
            text
            class="header-button"
            prepend-icon="mdi-history"
            @click="goToProjectHistory"
            variant="text"
            color="white"
          >
            Project History
          </v-btn>
          <v-btn
            text
            class="header-button"
            prepend-icon="mdi-lightbulb-on-outline"
            @click="showTips"
            variant="text"
            color="white"
          >
            Tips & Guidance
          </v-btn>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                text
                class="header-button"
                prepend-icon="mdi-web"
                v-bind="props"
                variant="text"
                color="white"
              >
                {{ selectedLanguage.toUpperCase() }}
              </v-btn>
            </template>
            <v-list bg-color="#2D2D2D" class="rounded-lg">
              <v-list-item
                v-for="lang in languages"
                :key="lang.value"
                @click="selectedLanguage = lang.value"
                class="language-item"
              >
                <v-list-item-title :class="{ 'text-purple-400': selectedLanguage === lang.value }">
                  {{ lang.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-avatar color="#8B5CF6" size="36" class="ml-4 cursor-pointer" @click="goToProfile">
            <span class="text-white text-sm">JD</span>
          </v-avatar>
          <v-btn
            text
            class="header-button ml-4"
            prepend-icon="mdi-logout"
            @click="logout"
            variant="text"
            color="white"
          >
            Logout
          </v-btn>
        </div>
      </header>

      <div class="content-area">
        <h1 class="welcome-title">Welcome to BrandForge AI!</h1>
        <p class="welcome-subtitle">Choose a studio to begin creating world-class brand assets.</p>

        <div class="studio-cards-grid">
          <v-card
            v-for="studio in studios"
            :key="studio.id"
            class="studio-card"
            :class="`studio-card-${studio.id.toLowerCase()}`"
            dark
            flat
          >
            <v-card-title class="studio-card-title">{{ studio.name }}</v-card-title>
            <v-card-subtitle class="studio-card-subtitle">{{ studio.tagline }}</v-card-subtitle>
            <v-card-text class="studio-card-features">
              <ul>
                <li v-for="feature in studio.features" :key="feature">
                  <v-icon small class="mr-2 text-purple-400">mdi-check-circle-outline</v-icon>{{ feature }}
                </li>
              </ul>
            </v-card-text>
            <v-card-actions class="studio-card-actions">
              <v-btn
                block
                color="#7C3AED"
                size="large"
                class="start-button"
                @click="startStudio(studio.id)"
              >
                Start {{ studio.name.split(' ')[0] }}
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>

        </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const selectedLanguage = ref('en');
const languages = ref([
  { title: 'English', value: 'en' },
]);

const studios = ref([
  {
    id: 'LogoCraft',
    name: 'LogoCraft™ Studio',
    tagline: 'Design unique logos with AI precision.',
    features: [
      'Style blending & cultural motifs',
      'Logo/mockup kit preview',
      'PNG, SVG, PDF, ZIP export',
    ],
    color: '#A78BFA',
  },
  {
    id: 'LeboGPT',
    name: 'Lebo GPT™ Studio',
    tagline: 'Generate compliant product labels effortlessly.',
    features: [
      'Compliance summary & multi-language',
      'Flat/wrap/isometric preview',
      'PNG, PDF, DOCX, SVG, ZIP export',
    ],
    color: '#8B5CF6',
  },
  {
    id: 'Postra',
    name: 'Postra™ Studio',
    tagline: 'Create stunning posters for any event.',
    features: [
      'Trend engine & async job logic',
      'Watermark preview',
      'PNG, JPG, PDF, SVG, PPTX export',
    ],
    color: '#7C3AED',
  },
]);

const goToProjectHistory = () => {
 router.push('/project-history');
};

const showTips = () => {
   router.push('/tips-guidance');
};

const goToProfile = () => {
  router.push('/profile');
};

const startStudio = (studioId) => {
  router.push(`/studio/${studioId.toLowerCase()}`);
};

const logout = () => {
  router.push('/');
};

</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}

.home-page-wrapper {
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

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.header-button {
  color: #D1D5DB !important;
  text-transform: none !important;
  font-weight: 500 !important;
  border-radius: 0.5rem !important;
  padding: 0.5rem 1rem !important;
  transition: background-color 0.3s ease;
}
.header-button:hover {
  background-color: rgba(139, 92, 246, 0.1) !important;
  color: #8B5CF6 !important;
}

.language-item {
  color: #D1D5DB !important;
}
.language-item:hover {
  background-color: rgba(139, 92, 246, 0.1) !important;
}

.text-purple-400 {
  color: #A78BFA !important;
}

.content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.welcome-title {
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
@media (min-width: 768px) {
  .welcome-title {
    font-size: 3.5rem;
  }
}

.welcome-subtitle {
  color: #9CA3AF;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.studio-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 3rem;
}
@media (min-width: 768px) {
  .studio-cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
@media (min-width: 1024px) {
  .studio-cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.studio-card {
  background-color: #1a1a1a !important;
  border-radius: 1rem !important;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #4B5563;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.studio-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px -5px rgba(0, 0, 0, 0.6), 0 6px 10px -3px rgba(0, 0, 0, 0.3);
}

.studio-card-title {
  color: white !important;
  font-size: 1.75rem !important;
  font-weight: bold !important;
  margin-bottom: 0.5rem;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  line-height: 1.2;
}

.studio-card-subtitle {
  color: #9CA3AF !important;
  font-size: 0.95rem !important;
  margin-bottom: 1rem;
}

.studio-card-features {
  color: #D1D5DB !important;
  font-size: 0.9rem !important;
  padding: 0 !important;
  margin-bottom: 1.5rem;
  text-align: left;
}
.studio-card-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.studio-card-features li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.studio-card-actions {
  padding: 0 !important;
  margin-top: auto;
}

.start-button {
  background-color: #7C3AED !important;
  border-radius: 0.5rem !important;
  font-weight: bold !important;
  color: white !important;
  text-transform: none !important;
  transition: background-color 0.3s ease;
}
.start-button:hover {
  background-color: #6D28D9 !important;
}

.smart-prompt-cta {
  background-color: #1a1a1a;
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  border: 1px solid #4B5563;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.smart-prompt-title {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.smart-prompt-subtitle {
  color: #9CA3AF;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.smart-prompt-button {
  background-color: #8B5CF6 !important;
  border-radius: 0.5rem !important;
  font-weight: bold !important;
  color: white !important;
  text-transform: none !important;
  transition: background-color 0.3s ease;
}
.smart-prompt-button:hover {
  background-color: #7C3AED !important;
}
</style>
