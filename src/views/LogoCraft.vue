<template>
  <div class="logocraft-page-wrapper font-inter">
    <div class="main-container">

      <!-- Header Section -->
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

      <!-- Main Content Area: Columns Switched (Form on Left, Branding/Preview on Right) -->
      <div class="content-area">
        <!-- Left Panel: Form Steps -->
        <div class="left-content-panel">
          <!-- Progress Bar -->
          <div class="progress-section">
            <span class="progress-label">Progress: Step {{ currentStep }} of {{ totalSteps }}</span>
            <v-progress-linear
              :model-value="progressPercentage"
              color="#8B5CF6"
              height="8"
              rounded
              class="progress-bar"
            ></v-progress-linear>
          </div>

          <!-- Onboarding Form Steps -->
          <v-window v-model="currentStep" class="onboarding-window">
            <!-- Step 1: Welcome Stage -->
            <v-window-item :value="1">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Welcome to LogoCraft™!</h3>
                  <p class="step-description">
                    "👋 Welcome to LogoCraft v2.9 – Your AI-Powered Logo Designer!
                    I help you create stunning logos from scratch or enhance existing ones — fast, smart, and professional.
                    Ready to begin? Just say: ‘Let’s start!’"
                  </p>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 2: Brand & Identity Input -->
            <v-window-item :value="2">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Brand & Identity Input</h3>
                  <v-text-field
                    v-model="formData.brandName"
                    label="What’s your brand or company name? (Required)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    clearable
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.slogan"
                    label="Do you have a slogan or tagline you’d like to include? (Optional)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    clearable
                  ></v-text-field>
                  <v-textarea
                    v-model="formData.brandKeywords"
                    label="Give me 3–5 words that describe your brand's vibe, mission, or audience. (Optional but recommended)"
                    hint="(e.g., youthful, eco, fintech, calm)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    rows="2"
                  ></v-textarea>
                  <v-select
                    v-model="formData.industrySector"
                    :items="industrySectors"
                    label="What industry or field is your brand in? (Required)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    required
                  ></v-select>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 3: Logo Creation Mode -->
            <v-window-item :value="3">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Logo Creation Mode</h3>
                  <v-radio-group v-model="formData.creationMode" class="form-field-margin" required>
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Are we designing a brand-new logo or improving an existing one? (Required)</span>
                    </template>
                    <v-radio label="Start from scratch" value="scratch" color="#8B5CF6"></v-radio>
                    <v-radio label="Improve existing" value="improve" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 4: If Improving Existing Logo (Conditional) -->
            <v-window-item :value="4">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Improve Existing Logo</h3>
                  <v-file-input
                    v-model="formData.existingLogo"
                    label="Please upload the logo you’d like to improve."
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    prepend-icon="mdi-upload"
                    show-size
                    counter
                  ></v-file-input>
                  <h4 class="mt-4 text-white">What would you like to improve? (Select one or more)</h4>
                  <v-checkbox
                    v-for="goal in improvementGoals"
                    :key="goal"
                    v-model="formData.improvementGoals"
                    :label="goal"
                    :value="goal.toLowerCase().replace(/ /g, '-')"
                    color="#8B5CF6"
                    hide-details
                    class="custom-checkbox"
                  ></v-checkbox>
                  <v-radio-group v-model="formData.preserveElements" class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Which elements must stay as they are?</span>
                    </template>
                    <v-radio v-for="element in preserveElementsOptions" :key="element" :label="element" :value="element.toLowerCase().replace(/ /g, '-')" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 5: Design Preferences (New or Improved) -->
            <v-window-item :value="5">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Design Preferences</h3>
                  <v-select
                    v-model="formData.logoTypePreference"
                    :items="logoTypes"
                    label="What type of logo do you want?"
                    hint="(GPT can suggest based on brand tone.)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                  ></v-select>
                  <v-text-field
                    v-model="formData.blendStyleSelection"
                    label="Would you like to blend different visual styles? (Optional)"
                    hint="(e.g., AfroMinimalist + Futuristic Tech, Vintage + Global Modern)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    clearable
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.fontPreference"
                    label="Any font style you prefer? (Serif, Sans-serif, Display, or specific name?) (Optional)"
                    hint="(GPT recommends if skipped.)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    clearable
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.colorPalette"
                    label="Do you have preferred colors or HEX codes in mind? (Optional)"
                    hint="(e.g., Navy + Coral, or #0047AB and #FF6F61)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    clearable
                  ></v-text-field>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 6: Logo Usage Planning -->
            <v-window-item :value="6">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Logo Usage Planning</h3>
                  <h4 class="text-white mb-2">Where will you use the logo? (Required)</h4>
                  <v-checkbox
                    v-for="usage in logoUsages"
                    :key="usage"
                    v-model="formData.logoUsage"
                    :label="usage"
                    :value="usage.toLowerCase().replace(/ /g, '-')"
                    color="#8B5CF6"
                    hide-details
                    class="custom-checkbox"
                  ></v-checkbox>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 7: Smart System Settings -->
            <v-window-item :value="7">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Smart System Settings</h3>
                  <v-radio-group v-model="formData.enableTrainingTips" class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Enable Training Tips? (ON by default)</span>
                    </template>
                    <v-radio label="On" value="on" color="#8B5CF6"></v-radio>
                    <v-radio label="Off" value="off" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                  <v-radio-group v-model="formData.functionExplanations" class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Function Explanations? (ON by default)</span>
                    </template>
                    <v-radio label="On" value="on" color="#8B5CF6"></v-radio>
                    <v-radio label="Off" value="off" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                  <v-radio-group v-model="formData.multiBrandSession" class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Multi-brand Session? (ON by default)</span>
                    </template>
                    <v-radio label="On" value="on" color="#8B5CF6"></v-radio>
                    <v-radio label="Off" value="off" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Final Step: Completion -->
            <v-window-item :value="8">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Completion</h3>
                  <p class="step-description">
                    "Awesome! I’ve got everything I need.
                    Ready to create your first preview now?"
                  </p>
                  <v-btn
                    block
                    color="#7C3AED"
                    size="large"
                    class="generate-button"
                    @click="generatePreview"
                  >
                    Yes – Show Preview
                    <v-icon right>mdi-eye-outline</v-icon>
                  </v-btn>
                  <v-btn
                    block
                    color="#4B5563"
                    variant="outlined"
                    size="large"
                    class="mt-4 nav-button"
                    @click="currentStep = 1"
                  >
                    Review Answers
                  </v-btn>
                  <v-btn
                    block
                    color="#4B5563"
                    variant="outlined"
                    size="large"
                    class="mt-4 nav-button"
                    @click="currentStep = 1"
                  >
                    Make Changes
                  </v-btn>
                </div>
              </v-fade-transition>
            </v-window-item>
          </v-window>

          <!-- Navigation Buttons -->
          <div class="navigation-buttons">
            <v-btn
              v-if="currentStep > 1 && currentStep <= totalSteps"
              @click="prevStep"
              color="#4B5563"
              variant="outlined"
              size="large"
              class="nav-button"
            >
              <v-icon left>mdi-arrow-left</v-icon> Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="currentStep < totalSteps"
              @click="nextStep"
              color="#8B5CF6"
              size="large"
              class="nav-button"
              :disabled="!isCurrentStepValid"
            >
              Next <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              v-if="currentStep === totalSteps"
              @click="generatePreview"
              color="#7C3AED"
              size="large"
              class="nav-button"
              :disabled="!isCurrentStepValid"
            >
              Generate Preview <v-icon right>mdi-eye-outline</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- Right Panel: Static Branding/Intro OR Dynamic Preview -->
        <div class="right-branding-panel">
          <div v-if="displayPreview" class="dynamic-preview-container">
            <v-btn
              color="#7C3AED"
              size="small"
              class="download-button"
              prepend-icon="mdi-download"
              @click="downloadPreview"
            >
              Download
            </v-btn>
            <img :src="previewImageUrl" alt="Generated Logo Preview" class="dynamic-logo-preview" />
          </div>
          <div v-else class="logocraft-branding">
            <h2 class="logocraft-title">LogoCraft™ Studio</h2>
            <p class="logocraft-subtitle">Your AI-Powered Logo Designer!</p>
            <p class="logocraft-description">
              "Create stunning logos from scratch or enhance existing ones — fast, smart, and professional."
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const currentStep = ref(1);
const totalSteps = 7; // Total main steps before completion

const formData = reactive({
  brandName: '',
  slogan: '',
  brandKeywords: '',
  industrySector: null,
  creationMode: null, // 'scratch' or 'improve'
  existingLogo: null, // File object
  improvementGoals: [], // Array for multiple selections
  preserveElements: null,
  logoTypePreference: null,
  blendStyleSelection: '',
  fontPreference: '',
  colorPalette: '',
  logoUsage: [], // Array for multiple selections
  enableTrainingTips: 'on',
  functionExplanations: 'on',
  multiBrandSession: 'on',
});

const previewImageUrl = ref(null);

// Data for select/radio/checkbox options
const industrySectors = ['Education', 'Healthcare', 'Tech', 'Food', 'NGO', 'Retail', 'Finance', 'Automotive', 'Art & Design', 'Sports'];
const improvementGoals = ['Color Palette', 'Font', 'Style', 'Icon/Symbol', 'Layout', 'Fusion'];
const preserveElementsOptions = ['Brand Name', 'Symbol', 'Font', 'Layout', 'All Elements'];
const logoTypes = ['Wordmark', 'Lettermark', 'Iconic', 'Emblem', '3D', 'Mascot'];
const logoUsages = ['Web', 'Print', 'App Icon', 'Favicon', 'Social Media', 'All'];

// Computed property for progress bar
const progressPercentage = computed(() => {
  return (currentStep.value / totalSteps) * 100;
});

// Computed property to control dynamic preview visibility
const displayPreview = computed(() => {
  // Show preview from step 5 (Design Preferences) onwards, if a preview URL is set
  // And also if currentStep is the final completion step (step 8)
  return (currentStep.value >= 5 || currentStep.value === 8) && previewImageUrl.value !== null;
});

// Watch currentStep and relevant form data to update preview image
watch([currentStep, () => formData.logoTypePreference, () => formData.colorPalette], ([newStep]) => {
  if (newStep >= 5 || newStep === 8) { // Show preview from Design Preferences step or final completion step
    // Simulate a dynamic preview based on some form data
    if (formData.logoTypePreference && formData.colorPalette) {
      previewImageUrl.value = `https://placehold.co/400x300/${formData.colorPalette.replace('#', '') || '8B5CF6'}/FFFFFF?text=${formData.logoTypePreference}`;
    } else if (formData.logoTypePreference) {
      previewImageUrl.value = `https://placehold.co/400x300/8B5CF6/FFFFFF?text=${formData.logoTypePreference}`;
    } else {
      previewImageUrl.value = 'https://placehold.co/400x300/8B5CF6/FFFFFF?text=Logo+Preview'; // Generic placeholder
    }
  } else {
    previewImageUrl.value = null; // Hide preview on earlier steps
  }
}, { immediate: true }); // Run immediately on component load

// Basic validation for current step to enable Next button
const isCurrentStepValid = computed(() => {
  switch (currentStep.value) {
    case 1: return true; // Welcome stage, always valid
    case 2:
      return formData.brandName.trim() !== '' && formData.industrySector !== null;
    case 3:
      return formData.creationMode !== null;
    case 4: // Improvement step (conditional)
      if (formData.creationMode === 'improve') {
        return formData.existingLogo !== null && formData.improvementGoals.length > 0 && formData.preserveElements !== null;
      }
      return true; // If not 'improve' mode, this step is conceptually skipped/valid
    case 5:
      return formData.logoTypePreference !== null; // Logo Type is required
    case 6:
      return formData.logoUsage.length > 0; // At least one usage is required
    case 7:
      return formData.enableTrainingTips !== null && formData.functionExplanations !== null && formData.multiBrandSession !== null;
    default: return true;
  }
});

const nextStep = () => {
  if (!isCurrentStepValid.value) {
    alert('Please fill in all required fields for this step.');
    return;
  }

  // Special logic for conditional step 4
  if (currentStep.value === 3) {
    if (formData.creationMode === 'scratch') {
      currentStep.value = 5; // Skip step 4 if starting from scratch
    } else {
      currentStep.value++; // Go to step 4 if improving existing
    }
  } else if (currentStep.value < totalSteps + 1) { // +1 for the final completion step
    currentStep.value++;
  }
};

const prevStep = () => {
  // Special logic for conditional step 4 when going back
  if (currentStep.value === 5 && formData.creationMode === 'scratch') {
    currentStep.value = 3; // Go back to step 3 if we skipped step 4
  } else if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const generatePreview = () => {
  // This function is called when "Generate Preview" button is clicked on the last step (totalSteps)
  // or "Yes - Show Preview" is clicked on the final completion step (totalSteps + 1)
  alert('Generating logo preview with the following data: ' + JSON.stringify(formData, null, 2));
  // In a real application, this would trigger the AI model and display the result
  // For now, we ensure the preview is visible by setting currentStep to totalSteps + 1
  currentStep.value = totalSteps + 1; // Move to the completion step to show preview
};

const downloadPreview = () => {
  if (previewImageUrl.value) {
    const link = document.createElement('a');
    link.href = previewImageUrl.value;
    link.download = 'brandforge_logo.png'; // You can make this dynamic
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Downloading logo preview!');
  } else {
    alert('No preview available to download.');
  }
};

const goBackToHome = () => {
  router.push('/'); // Assuming '/' is your BrandForge AI home page
};
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}

.logocraft-page-wrapper {
  min-height: 100vh;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
  overflow-y: auto; /* Enables scrolling for the page wrapper */
}

.main-container {
  width: 100%;
  max-width: 1400px;
  background-color: #2D2D2D;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  min-height: 80vh; /* Ensure it takes up a good portion of the screen */
  padding: 2rem;
  flex-grow: 1;
}
@media (min-width: 768px) {
  .main-container {
    padding: 3rem;
  }
}

/* Header Styles */
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

/* Content Area - Two Panels */
.content-area {
  display: flex;
  flex-direction: column; /* Default for mobile: columns */
  flex-grow: 1;
}
@media (min-width: 1024px) {
  .content-area {
    flex-direction: row; /* Desktop: rows */
  }
}

/* Left Content Panel (Form Steps) */
.left-content-panel {
  flex: 1.5; /* Takes more space for the form */
  background-color: #1a1a1a;
  border-radius: 0.75rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto; /* Enables scrolling for content within this panel */
  max-height: 100%; /* Ensures it respects parent height for scrolling */
  margin-bottom: 2rem; /* Space below on mobile/tablet when it's the first column */
}
@media (min-width: 1024px) {
  .left-content-panel {
    margin-right: 2rem; /* Space between the two columns on desktop */
    margin-bottom: 0;
  }
}

/* Right Branding Panel (Static Branding/Intro OR Dynamic Preview) */
.right-branding-panel {
  flex: 1;
  background-color: #1a1a1a;
  border-radius: 0.75rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative; /* Needed for positioning download button */
}

.logocraft-branding {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logocraft-title {
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.logocraft-subtitle {
  color: #9CA3AF;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.logocraft-description {
  color: #D1D5DB;
  font-style: italic;
  font-size: 0.95rem;
  max-width: 400px;
}

/* Dynamic Preview Container and Image */
.dynamic-preview-container {
  display: flex; /* Use flexbox for positioning button */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%; /* Take full height of parent to center content */
  position: relative; /* For z-index of button */
}

.dynamic-logo-preview {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 0.75rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: block;
  margin: 0 auto;
}

.download-button {
  position: absolute;
  top: 1rem; /* Adjust as needed for spacing from top */
  right: 1rem; /* Adjust as needed for spacing from right */
  z-index: 10; /* Ensure button is above the image */
  background-color: #7C3AED !important;
  color: white !important;
  border-radius: 0.5rem !important;
  text-transform: none !important;
  font-weight: bold !important;
  padding: 0.5rem 1rem !important;
  transition: background-color 0.3s ease;
}
.download-button:hover {
  background-color: #6D28D9 !important;
}

.progress-section {
  margin-bottom: 2rem;
  text-align: center;
}

.progress-label {
  color: #D1D5DB;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: block;
}

.progress-bar {
  border-radius: 9999px !important;
}

.onboarding-window {
  flex-grow: 1;
  padding-bottom: 2rem;
}

.step-content {
  padding: 1rem 0;
}

.step-title {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
}

.step-description {
  color: #9CA3AF;
  font-size: 1rem;
  margin-bottom: 2rem;
  text-align: left;
}

.form-field-margin {
  margin-bottom: 1rem;
}

.custom-input .v-field__outline {
  border-width: 1px !important;
  border-color: #4B5563 !important;
}

/* Darker dropdown background and text color */
.custom-input :deep(.v-overlay__content .v-list) {
  background-color: #2D2D2D !important;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.custom-input :deep(.v-list-item-title) {
  color: #E5E7EB !important;
}

.custom-input :deep(.v-list-item--active .v-list-item-title) {
  color: #8B5CF6 !important;
}

.custom-input :deep(.v-list-item--active) {
  background-color: rgba(139, 92, 246, 0.1) !important;
}

.custom-input .v-field__input {
  color: #E5E7EB !important;
}

.custom-input .v-label {
  color: #9CA3AF !important;
}

/* White text for radio buttons and checkboxes labels */
.radio-checkbox-label,
.v-radio :deep(.v-label),
.v-checkbox :deep(.v-label) {
  color: #E5E7EB !important;
  font-size: 0.875rem;
}

.custom-checkbox .v-selection-control__wrapper {
    color: #8B5CF6 !important;
}

.content-summary-card {
  background-color: #2D2D2D;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #4B5563;
  text-align: left;
}
.content-summary-card h4 {
  color: #A78BFA;
  margin-bottom: 1rem;
}
.content-summary-card p {
  color: #D1D5DB;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
.content-summary-card p strong {
  color: white;
}

.branding-asset-uploads {
  margin-top: 1rem;
  border-top: 1px dashed #4B5563;
  padding-top: 1rem;
}

/* Navigation Buttons */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
}

.nav-button {
  border-radius: 0.5rem !important;
  font-weight: bold !important;
  text-transform: none !important;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.nav-button:hover {
  transform: translateY(-2px);
}
.nav-button[color="#8B5CF6"]:hover {
  background-color: #7C3AED !important;
}
.nav-button[color="#4B5563"]:hover {
  background-color: rgba(75, 85, 99, 0.2) !important;
}
.generate-button {
  background-color: #7C3AED !important;
  color: white !important;
}
.generate-button:hover {
  background-color: #6D28D9 !important;
}
</style>
