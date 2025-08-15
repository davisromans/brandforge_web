<template>
  <div class="logocraft-page-wrapper font-inter">
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
        <div class="left-content-panel">
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
          <v-window v-model="currentStep" class="onboarding-window">
            <v-window-item :value="1">
              <div class="step-content">
                <h3 class="step-title">Welcome to LogoCraft™!</h3>
                <p class="step-description">"👋 Welcome to LogoCraft v2.9 – Your AI-Powered Logo Designer! I help you create stunning logos from scratch or enhance existing ones — fast, smart, and professional. Ready to begin? Just say: ‘Let’s start!’"</p>
              </div>
            </v-window-item>

            <v-window-item :value="2">
              <div class="step-content">
                <h3 class="step-title">Brand & Identity Input</h3>
                <v-text-field v-model="formData.brandName" label="What’s your brand or company name? (Required)" variant="outlined" class="custom-input form-field-margin" required></v-text-field>
                <v-text-field v-model="formData.slogan" label="Do you have a slogan or tagline you’d like to include? (Optional)" variant="outlined" class="custom-input form-field-margin"></v-text-field>
                <v-textarea v-model="formData.brandKeywords" label="Give me 3–5 words that describe your brand's vibe, mission, or audience." hint="(e.g., youthful, eco, fintech, calm)" variant="outlined" class="custom-input form-field-margin" rows="2"></v-textarea>
                <v-select v-model="formData.industrySector" :items="industrySectors" label="What industry is your brand in? (Required)" variant="outlined" class="custom-input form-field-margin" required></v-select>
              </div>
            </v-window-item>

            <v-window-item :value="3">
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
            </v-window-item>

            <v-window-item :value="4">
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
            </v-window-item>

            <v-window-item :value="5">
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
            </v-window-item>

            <v-window-item :value="6">
              <div class="step-content">
                <h3 class="step-title">Logo Usage Planning</h3>
                <h4 class="text-white mb-2">Where will you use the logo? (Required)</h4>
                <v-checkbox
                  v-model="allSelected"
                  label="All"
                  color="#8B5CF6"
                  hide-details
                  class="custom-checkbox"
                ></v-checkbox>
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
            </v-window-item>

            <v-window-item :value="7">
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
            </v-window-item>

            <v-window-item :value="8">
              <div class="step-content">
                <h3 class="step-title">Review & Confirm</h3>
                <p class="step-description">Please review your project details before generating the preview.</p>
                <div class="summary-view">
                  <p><strong>Brand Name:</strong> {{ formData.brandName || 'N/A' }}</p>
                  <p><strong>Slogan:</strong> {{ formData.slogan || 'N/A' }}</p>
                  <p><strong>Industry:</strong> {{ formData.industrySector || 'N/A' }}</p>
                  <p><strong>Keywords:</strong> {{ formData.brandKeywords || 'N/A' }}</p>
                  <p><strong>Creation Mode:</strong> {{ formData.creationMode === 'scratch' ? 'Start from scratch' : 'Improve existing' || 'N/A' }}</p>
                  <p v-if="formData.creationMode === 'improve'"><strong>Improvements:</strong> {{ formData.improvementGoals.join(', ') || 'N/A' }}</p>
                  <p><strong>Logo Type:</strong> {{ formData.logoTypePreference || 'N/A' }}</p>
                  <p><strong>Logo Usage:</strong> {{ formData.logoUsage.join(', ') || 'N/A' }}</p>
                </div>
              </div>
            </v-window-item>

             <v-window-item :value="9">
              <div class="step-content">
                <h3 class="step-title">Completion</h3>
                <p class="step-description">"Awesome! I’ve got everything I need. Ready to create your first preview now?"</p>
              </div>
            </v-window-item>

            <v-window-item :value="10">
              <div class="step-content">
                <h3 class="step-title">Refine This Logo</h3>
                <p class="step-description">You have {{ refinementCredits }} refinement{{ refinementCredits !== 1 ? 's' : '' }} left. What would you like to change?</p>

                <v-textarea v-model="refinementQuery" label="Refinement Query" variant="outlined" class="custom-input form-field-margin mt-6" rows="3"></v-textarea>

                <v-btn v-if="refinementCredits > 0" block color="#8B5CF6" size="large" class="nav-button mt-4" @click="sendRefinement" :disabled="!refinementQuery || !selectedPreview">
                  Apply Refinement
                </v-btn>
                <v-btn v-else block color="#8B5CF6" size="large" class="nav-button mt-4" @click="showPaymentDialog('more-refinements')">
                  Pay for more refinements (TZS 2,000)
                </v-btn>
              </div>
            </v-window-item>

          </v-window>

          <div class="navigation-buttons">
            <v-btn v-if="currentStep > 1 && projectState === 'form'" @click="prevStep" color="#4B5563" variant="outlined" size="large" class="nav-button"><v-icon left>mdi-arrow-left</v-icon> Back</v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="currentStep < totalSteps" @click="nextStep" color="#8B5CF6" size="large" class="nav-button" :disabled="!isCurrentStepValid">Next <v-icon right>mdi-arrow-right</v-icon></v-btn>
            <v-btn v-if="currentStep === totalSteps" @click="generatePreview" color="#7C3AED" size="large" class="nav-button" :disabled="!isCurrentStepValid">Generate Preview <v-icon right>mdi-eye-outline</v-icon></v-btn>
          </div>
        </div>

        <div class="right-branding-panel">
          <div v-if="projectState === 'form'" class="logocraft-branding">
            <h2 class="logocraft-title">LogoCraft™ Studio</h2>
            <p class="logocraft-subtitle">Your AI-Powered Logo Designer!</p>
            <p class="logocraft-description">"Create stunning logos from scratch or enhance existing ones — fast, smart, and professional."</p>
          </div>

          <div v-else-if="projectState === 'processing'" class="loading-screen">
            <v-progress-circular indeterminate color="#8B5CF6" size="64"></v-progress-circular>
            <h3 class="mt-6 text-white text-xl font-bold">Crafting your logo...</h3>
            <p class="mt-2 text-gray-400">This may take a moment. We're using AI to bring your vision to life!</p>
          </div>

          <div v-else-if="projectState === 'previews'" class="dynamic-preview-container">
            <h3 class="step-title text-center">Your Logo Previews</h3>
            <p class="step-description text-center">Select your favorite design to generate the final high-quality version.</p>

            <div class="preview-grid-fixed">
              <div
                v-for="(imageUrl, index) in previews"
                :key="index"
                class="preview-card"
                :class="{ 'selected-card': selectedPreview === imageUrl }"
                @click="selectedPreview = imageUrl"
              >
                <img :src="imageUrl" :alt="'Logo preview variant ' + (index + 1)" class="preview-image" />
                <div class="caption">Variant {{ index + 1 }}</div>
                <v-icon v-if="selectedPreview === imageUrl" class="select-icon" color="success">mdi-check-circle</v-icon>
              </div>
            </div>

            <div class="mt-6 w-full download-buttons-container">
                <v-btn color="#7C3AED" size="large" class="download-button" :disabled="!selectedPreview" @click="showPaymentDialog('finalize')">
                    Finalize & Generate High-Res (TZS 13,000)
                </v-btn>
                <v-btn color="#4B5563" variant="outlined" size="large" class="download-button" :disabled="!selectedPreview" @click="showPaymentDialog('more-previews')">
                    Refine This Logo (TZS 2,000)
                </v-btn>
            </div>
          </div>

          <div v-else-if="projectState === 'refine' && refinementImages.length > 0" class="refinement-view">
             <h3 class="step-title text-center">Refined Logo</h3>
             <p class="step-description text-center">Your refined logo is ready. What would you like to do next?</p>

             <div class="refinement-image-card">
               <v-img :src="refinementImages[0]" class="refinement-image" :alt="'Refined Logo'"></v-img>
             </div>

             <div class="mt-6 w-full download-buttons-container">
                 <v-btn block color="#8B5CF6" size="large" class="nav-button" @click="showPaymentDialog('more-refinements')">
                    Refine this logo further (TZS 2,000)
                 </v-btn>
                 <v-btn block color="#7C3AED" size="large" class="mt-4 nav-button" @click="showPaymentDialog('finalize')">
                    Finalize & Generate Final Image (TZS 13,000)
                    <v-icon right>mdi-download</v-icon>
                 </v-btn>
             </div>
          </div>

          <div v-else-if="projectState === 'final' && finalImages.length > 0" class="dynamic-preview-container">
            <h3 class="step-title text-center">Your Final, High-Quality Logo!</h3>
            <p class="step-description text-center">Your logo is ready. Download the versions you need.</p>

            <div class="preview-grid-final">
                <div class="preview-card-final" v-for="(image, index) in finalImages" :key="index">
                    <img :src="image" :alt="'Final logo ' + (index+1)" class="preview-image" />
                    <div class="caption">Final {{ index + 1 }}</div>
                </div>
            </div>

            <div class="mt-4 w-full download-buttons-container">
                <v-btn v-for="(image, index) in finalImages" :key="index" color="#7C3AED" class="download-button" prepend-icon="mdi-download" @click="downloadImage(image, `final_logo_${index+1}.png`)">
                    Download Final {{ index + 1 }}
                </v-btn>
            </div>
          </div>

        </div>
      </div>
    </div>

    <v-dialog v-model="showPaymentDialogModel" max-width="500px">
      <v-card class="payment-dialog-card">
        <v-card-title class="text-h5 text-white">Complete Your Purchase</v-card-title>
        <v-card-text>
          <p class="text-white">You are about to pay <strong>{{ paymentAmount }}</strong> to {{ paymentActionText }}.</p>
          <v-radio-group v-model="paymentMethod" class="mt-4">
            <v-radio label="M-Pesa (MNO)" value="mpesa" color="#8B5CF6"></v-radio>
            <v-radio label="Visa/Mastercard" value="visa" color="#8B5CF6"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions class="payment-actions">
          <v-spacer></v-spacer>
          <v-btn color="#4B5563" text @click="showPaymentDialogModel = false">Cancel</v-btn>
          <v-btn color="#7C3AED" @click="processDummyPayment">Pay Now</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const STORAGE_KEY = 'logocraft_session';

const currentStep = ref(1);
const totalSteps = 10;
const projectState = ref('form');
const projectId = ref(null);
const versionId = ref(null);
const previews = ref([]);
const selectedPreview = ref(null);
const finalImages = ref([]);
const refinementImages = ref([]);
const refinementQuery = ref('');
const refinementCredits = ref(3);
const pollingInterval = ref(null);

const showPaymentDialogModel = ref(false);
const paymentMethod = ref('mpesa');
const paymentAction = ref('');
const paymentAmount = computed(() => {
    if (paymentAction.value === 'finalize') return 'TZS 13,000';
    if (paymentAction.value === 'more-previews' || paymentAction.value === 'more-refinements') return 'TZS 2,000';
    return 'TZS 0';
});
const paymentActionText = computed(() => {
  if (paymentAction.value === 'finalize') return 'generate your final image';
  if (paymentAction.value === 'more-previews') return 'generate more previews';
  if (paymentAction.value === 'more-refinements') return 'get more refinements';
  return 'complete your purchase';
});

const defaultFormData = {
  brandName: '',
  slogan: '',
  brandKeywords: '',
  industrySector: null,
  creationMode: null,
  existingLogo: null,
  improvementGoals: [],
  preserveElements: null,
  logoTypePreference: null,
  blendStyleSelection: '',
  fontPreference: '',
  colorPalette: '',
  logoUsage: [],
  enableTrainingTips: 'on',
  functionExplanations: 'on',
  multiBrandSession: 'on',
};

const formData = reactive({ ...defaultFormData });

const industrySectors = ['Education', 'Healthcare', 'Tech', 'Food', 'NGO', 'Retail', 'Finance', 'Automotive', 'Art & Design', 'Sports'];
const improvementGoals = ['Color Palette', 'Font', 'Style', 'Icon/Symbol', 'Layout', 'Fusion'];
const preserveElementsOptions = ['Brand Name', 'Symbol', 'Font', 'Layout', 'All Elements'];
const logoTypes = ['Wordmark', 'Lettermark', 'Iconic', 'Emblem', '3D', 'Mascot'];
const logoUsages = ['Web', 'Print', 'App Icon', 'Favicon', 'Social Media'];
const allSelected = ref(false);

watch(allSelected, (newValue) => {
  if (newValue) {
    formData.logoUsage = [...logoUsages];
  } else {
    formData.logoUsage = [];
  }
});

watch(() => formData.logoUsage, (newVal) => {
  if (newVal.length === logoUsages.length) {
    allSelected.value = true;
  } else {
    allSelected.value = false;
  }
}, { deep: true });

const saveState = () => {
  try {
    const state = {
      currentStep: currentStep.value,
      projectState: projectState.value,
      projectId: projectId.value,
      versionId: versionId.value,
      previews: previews.value,
      selectedPreview: selectedPreview.value,
      finalImages: finalImages.value,
      refinementImages: refinementImages.value,
      refinementCredits: refinementCredits.value,
      formData: { ...formData },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage:', e);
  }
};

const loadState = () => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    try {
      const state = JSON.parse(savedState);
      currentStep.value = state.currentStep || 1;
      projectState.value = state.projectState || 'form';
      projectId.value = state.projectId;
      versionId.value = state.versionId;
      previews.value = state.previews || [];
      selectedPreview.value = state.selectedPreview;
      finalImages.value = state.finalImages || [];
      refinementImages.value = state.refinementImages || [];
      refinementCredits.value = state.refinementCredits || 3;
      Object.assign(formData, state.formData || defaultFormData);

      if (projectState.value === 'processing' && versionId.value) {
        pollStatus();
        pollingInterval.value = setInterval(pollStatus, 5000);
      }
    } catch (e) {
        console.error("Failed to load state, clearing storage:", e);
        localStorage.removeItem(STORAGE_KEY);
    }
  }
};

watch(
  () => ({
    step: currentStep.value,
    state: projectState.value,
    pId: projectId.value,
    vId: versionId.value,
    prev: previews.value,
    sel: selectedPreview.value,
    final: finalImages.value,
    refine: refinementImages.value,
    refineCredits: refinementCredits.value,
    form: { ...formData }
  }),
  saveState,
  { deep: true }
);

onMounted(loadState);
onBeforeUnmount(() => { clearInterval(pollingInterval.value); });
onBeforeRouteLeave((to, from) => { if (to.path !== from.path) { localStorage.removeItem(STORAGE_KEY); } });

const progressPercentage = computed(() => (currentStep.value / totalSteps) * 100);

const isCurrentStepValid = computed(() => {
  if (currentStep.value === 2 && (!formData.brandName || !formData.industrySector)) return false;
  if (currentStep.value === 3 && !formData.creationMode) return false;
  if (currentStep.value === 4 && formData.creationMode === 'improve' && (!formData.existingLogo || formData.improvementGoals.length === 0 || !formData.preserveElements)) return false;
  if (currentStep.value === 5 && !formData.logoTypePreference) return false;
  if (currentStep.value === 6 && formData.logoUsage.length === 0) return false;
  return true;
});

const nextStep = () => {
  if (!isCurrentStepValid.value) {
    alert('Please fill in all required fields for this step.');
    return;
  }
  if (currentStep.value === 3 && formData.creationMode === 'scratch') {
    currentStep.value = 5;
  } else if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value === 5 && formData.creationMode === 'scratch') {
    currentStep.value = 3;
  } else if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const goBackToHome = () => {
  localStorage.removeItem(STORAGE_KEY);
  clearInterval(pollingInterval.value);
  router.push('/homepage');
};

// const goBackToPreviews = () => {
//   projectState.value = 'previews';
//   selectedPreview.value = null;
//   refinementImages.value = [];
//   refinementQuery.value = '';
// };

const generatePreview = async () => {
  if (!isCurrentStepValid.value) return;
  projectState.value = 'processing';
  clearInterval(pollingInterval.value);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}studio/LogoCraft/generate`,
      { project_id: projectId.value, ...formData },
      { headers: { Authorization: `Bearer ${authStore.token}` } }
    );
    projectId.value = response.data.project_id;
    versionId.value = response.data.version_id;

    if (response.status === 202) {
      pollStatus();
      pollingInterval.value = setInterval(pollStatus, 5000);
    }
  } catch (error) {
    console.error('API Error during generation:', error);
    alert('An error occurred. Please try again.');
    projectState.value = 'form';
  }
};

const pollStatus = async () => {
  if (!versionId.value) {
    clearInterval(pollingInterval.value);
    return;
  }
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}studio/status/LogoCraft/${versionId.value}`,
      { headers: { Authorization: `Bearer ${authStore.token}` } }
    );
    const { status, images, high_quality_images, refinement_images, refinement_credits, message } = response.data;

    if (refinement_credits !== undefined) {
      refinementCredits.value = refinement_credits;
    }

    if (status === 'Ready for Preview' && Array.isArray(images) && images.length > 0) {
      clearInterval(pollingInterval.value);
      projectState.value = 'previews';
      previews.value = images;
    } else if (status === 'Completed Refinement' && Array.isArray(refinement_images) && refinement_images.length > 0) {
      clearInterval(pollingInterval.value);
      selectedPreview.value = refinementImages.value[0] = refinement_images[0];
      projectState.value = 'refine';
    } else if (status === 'Completed' && Array.isArray(high_quality_images) && high_quality_images.length > 0) {
      clearInterval(pollingInterval.value);
      projectState.value = 'final';
      finalImages.value = high_quality_images;
    } else if (status === 'Failed') {
      clearInterval(pollingInterval.value);
      alert('Image generation failed: ' + (message || 'Unknown error'));
      projectState.value = 'form';
    }
  } catch (error) {
    console.error('Polling Error:', error);
    clearInterval(pollingInterval.value);
    projectState.value = 'form';
    alert('Could not get generation status.');
  }
};

const showPaymentDialog = (action) => {
  paymentAction.value = action;
  showPaymentDialogModel.value = true;
};

const processDummyPayment = async () => {
  showPaymentDialogModel.value = false;
  const action = paymentAction.value;
  let imageToUse;

  if (action === 'finalize') {
    imageToUse = selectedPreview.value;
    if (!imageToUse) {
      alert('Please select a logo to finalize.');
      return;
    }
  } else if (action === 'more-previews') {
     imageToUse = selectedPreview.value;
     if (!imageToUse) {
         alert('Please select a logo to refine.');
         return;
     }
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}projects/${projectId.value}/pay-preview`,
      { action },
      { headers: { Authorization: `Bearer ${authStore.token}` } }
    );

    console.log('Payment Response:', response.data);
    alert(`Dummy payment of ${paymentAmount.value} via ${paymentMethod.value} successful!`);

    if (action === 'more-previews') {
      projectState.value = 'form';
      currentStep.value = 10;
      refinementImages.value = [imageToUse];
    } else if (action === 'finalize') {
      await selectFinalImage();
    }
  } catch (error) {
    console.error('Payment Error:', error);
    alert('Payment failed. Please try again.');
  }
};

const sendRefinement = async () => {
  if (refinementCredits.value <= 0) {
      alert('You have no refinement credits left. Please pay to get more.');
      return;
  }
  if (!refinementQuery.value || !selectedPreview.value) {
    alert('Please enter a refinement query and ensure a base image is selected.');
    return;
  }

  projectState.value = 'processing';
  clearInterval(pollingInterval.value);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}projects/${projectId.value}/refine`,
      { refinement_query: refinementQuery.value, selected_image_url: selectedPreview.value },
      { headers: { Authorization: `Bearer ${authStore.token}` } }
    );

    if (response.status === 202) {
      refinementCredits.value--; // Optimistically decrement credit count
      pollStatus();
      pollingInterval.value = setInterval(pollStatus, 5000);
    }
  } catch (error) {
    console.error('Refinement Error:', error);
    projectState.value = 'previews'; // Go back to previews on error
    alert('An error occurred during refinement.');
  }
};

const selectFinalImage = async () => {
  if (!selectedPreview.value) {
    alert('Please select a preview first.');
    return;
  }

  projectState.value = 'processing';
  clearInterval(pollingInterval.value);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}projects/${projectId.value}/finalize`,
      { selected_image_url: selectedPreview.value },
      { headers: { Authorization: `Bearer ${authStore.token}` } }
    );

    if (response.status === 202) {
      pollStatus();
      pollingInterval.value = setInterval(pollStatus, 5000);
    }
  } catch (error) {
    console.error('Finalization Error:', error);
    projectState.value = 'previews';
    alert('An error occurred during finalization.');
  }
};

const downloadImage = (url, filename) => {
  if (!url) return alert('No file available yet.');
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'logo.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
.font-inter { font-family: 'Inter', sans-serif; }
.logocraft-page-wrapper { min-height: 100vh; background-color: #1a1a1a; display: flex; align-items: center; justify-content: center; padding: 2rem; box-sizing: border-box; overflow-y: auto; }
.main-container { width: 100%; max-width: 1400px; background-color: #2D2D2D; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,.5), 0 4px 6px -2px rgba(0,0,0,.25); display: flex; flex-direction: column; min-height: 80vh; padding: 2rem; flex-grow: 1; }
@media (min-width:768px){ .main-container{ padding:3rem; } }

.app-header { display:flex; justify-content:space-between; align-items:center; padding-bottom:2rem; border-bottom:1px solid #4B5563; margin-bottom:2rem; flex-wrap:wrap; gap:1rem; }
.logo-text { color:white; font-size:1.8rem; font-weight:900; padding:.25rem .5rem; }
.logo-color { color:#a78bfa; }
.back-button { color:#D1D5DB !important; text-transform:none !important; font-weight:500 !important; border-radius:.5rem !important; padding:.5rem 1rem !important; transition:background-color .3s ease; }
.back-button:hover { background-color: rgba(139,92,246,.1) !important; color:#8B5CF6 !important; }

.content-area { display:flex; flex-direction:column; flex-grow:1; }
@media (min-width:1024px){ .content-area{ flex-direction:row; } }

.left-content-panel { flex:1.5; background-color:#1a1a1a; border-radius:.75rem; padding:2rem; display:flex; flex-direction:column; justify-content:space-between; overflow-y:auto; max-height:100%; margin-bottom:2rem; }
@media (min-width:1024px){ .left-content-panel{ margin-right:2rem; margin-bottom:0; } }
.left-form-container { flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; }
.left-refine-container { flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; }

.right-branding-panel { flex:1; background-color:#1a1a1a; border-radius:.75rem; padding:2rem; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; position:relative; }

.logocraft-branding { display:flex; flex-direction:column; align-items:center; }
.logocraft-title { color:white; font-size:2.5rem; font-weight:bold; margin-bottom:.5rem; }
.logocraft-subtitle { color:#9CA3AF; font-size:1.1rem; margin-bottom:1.5rem; }
.logocraft-description { color:#D1D5DB; font-style:italic; font-size:.95rem; max-width:400px; }
.dynamic-preview-container { display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; height:100%; position:relative; }
.refinement-preview-container { display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; height:100%; position:relative; }

/* --- PREVIEW GRID STYLES --- */
.preview-grid-fixed {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  margin-bottom: 1rem;
}
.refinement-images-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
    max-width: 300px;
    margin: 1rem auto;
}
.refinement-image-card {
  position: relative;
  border: 2px solid #4B5563;
  border-radius: 0.75rem;
  overflow: hidden;
  background: #111;
  padding: 0.5rem;
  text-align: center;
}
.refinement-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 0.5rem;
  background: white;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.preview-grid-final {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    width: 100%;
}

.preview-card-final {
    background: #111;
    padding: 0.5rem;
    border-radius: 0.75rem;
}

.download-buttons-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.download-button {
    flex-grow: 1;
}

.preview-card { position:relative; border:2px solid #4B5563; border-radius:.75rem; cursor:pointer; transition:border-color .3s ease, transform .2s ease; overflow:hidden; background:#111; padding:.5rem; }
.preview-card:hover { border-color:#8B5CF6; transform: translateY(-3px); }
.preview-card.selected-card { border-color:#7C3AED; box-shadow: 0 0 15px rgba(124, 58, 237, 0.5); }
.preview-image { width:100%; height:auto; display:block; border-radius:.5rem; background:white; aspect-ratio: 1 / 1; object-fit: cover; }
.caption { color:#E5E7EB; font-size:.85rem; text-align:center; margin-top:.4rem; }
.select-icon { position:absolute; top:.5rem; right:.5rem; background-color: rgba(0,0,0,0.5); border-radius: 50%; }

.loading-screen { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; }
.navigation-buttons { display:flex; justify-content:space-between; margin-top:2rem; gap:1rem; flex-shrink: 0; }
.nav-button { border-radius:.5rem !important; font-weight:bold !important; text-transform:none !important; transition:background-color .3s ease, transform .2s ease; }
.nav-button:hover { transform: translateY(-2px); }
.nav-button[color="#8B5CF6"]:hover { background-color:#7C3AED !important; }
.nav-button[color="#4B5563"]:hover { background-color:rgba(75,85,99,.2) !important; }
.generate-button { background-color:#7C3AED !important; color:white !important; }
.generate-button:hover { background-color:#6D28D9 !important; }

.progress-section { margin-bottom:2rem; text-align:center; }
.progress-label { color:#D1D5DB; font-size:.9rem; margin-bottom:.5rem; display:block; }
.progress-bar { border-radius: 9999px !important; }

.onboarding-window { flex-grow:1; overflow-y: auto; padding-right: 1rem; }
.step-content { padding:1rem 0; }
.step-title { color:white; font-size:1.8rem; font-weight:bold; margin-bottom:1rem; text-align:left; }
.step-description { color:#9CA3AF; font-size:1rem; margin-bottom:2rem; text-align:left; }

.form-field-margin { margin-bottom:1.5rem; }
.custom-input .v-field__outline { border-color:#4B5563 !important; }
.custom-input .v-field__input, .custom-input .v-label { color:#E5E7EB !important; }
.radio-checkbox-label, .v-radio :deep(.v-label), .v-checkbox :deep(.v-label){ color:#E5E7EB !important; font-size:.875rem; }
.payment-dialog-card {
  background-color: #2D2D2D !important;
  color: white !important;
  padding: 1.5rem;
}
.payment-actions {
  background-color: #2D2D2D;
}
</style>
