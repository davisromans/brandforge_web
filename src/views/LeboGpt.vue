<template>
  <div class="lebo-gpt-page-wrapper font-inter">
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

      <!-- Main Content Area: Columns Switched -->
      <div class="content-area">
        <!-- This is now the LEFT side (form + dynamic preview) -->
        <div class="right-panel">
          <!-- Dynamic Preview Area (appears conditionally on this panel) -->
          <div v-if="displayPreview" class="dynamic-preview-container">
            <img :src="previewImageUrl" alt="Generated Label Preview" class="dynamic-label-preview" />
          </div>

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
            <!-- Step 1: Greeting -->
            <v-window-item :value="1">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Welcome to Lebo GPT™!</h3>
                  <p class="step-description">
                    "Hello! I’m Lebo GPT v2.1. I’ll guide you through label creation."
                  </p>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 2: Chat & Label Setup -->
            <v-window-item :value="2">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Language & Role Setup</h3>
                  <v-select
                    v-model="formData.conversationLanguage"
                    :items="languages"
                    label="Which language would you like for our conversation?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                  ></v-select>
                  <v-select
                    v-model="formData.labelContentLanguage"
                    :items="languages"
                    label="What language should your label content be in?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                  ></v-select>
                  <v-select
                    v-model="formData.userRole"
                    :items="userRoles"
                    label="What’s your role in this project?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                  ></v-select>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 3: Region Selection -->
            <v-window-item :value="3">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Compliance Region</h3>
                  <v-select
                    v-model="formData.complianceRegion"
                    :items="regions"
                    label="Which region should we use for packaging compliance rules?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                  ></v-select>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 4: Product Information -->
            <v-window-item :value="4">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Product Details</h3>
                  <v-text-field
                    v-model="formData.productName"
                    label="What is the product name?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    clearable
                    required
                  ></v-text-field>
                  <v-textarea
                    v-model="formData.productDescription"
                    label="Please describe your product."
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    rows="3"
                  ></v-textarea>
                  <v-textarea
                    v-model="formData.ingredients"
                    label="What are the ingredients or materials used?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    rows="3"
                  ></v-textarea>
                  <v-text-field
                    v-model="formData.netWeightVolume"
                    label="What is the net weight or volume? (e.g., 250 ml, 500 g)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    clearable
                  ></v-text-field>
                  <v-textarea
                    v-model="formData.productUsage"
                    label="How should the product be used or applied?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    rows="3"
                  ></v-textarea>
                  <v-textarea
                    v-model="formData.safetyWarnings"
                    label="Are there any safety warnings, precautions, or allergen statements?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    rows="3"
                  ></v-textarea>
                  <v-file-input
                    v-model="formData.productImage"
                    label="Would you like to upload a product image for more accurate mockups?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    prepend-icon="mdi-camera"
                    show-size
                    counter
                  ></v-file-input>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 5: Label Type & Packaging Details -->
            <v-window-item :value="5">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Label & Packaging Details</h3>
                  <v-select
                    v-model="formData.labelType"
                    :items="labelTypes"
                    label="Which label type would you like to use?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                  ></v-select>
                  <v-radio-group v-model="formData.recommendLabelType" inline class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Would you like me to recommend the best label type for your product?</span>
                    </template>
                    <v-radio label="Yes" value="yes" color="#8B5CF6"></v-radio>
                    <v-radio label="No" value="no" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                  <v-select
                    v-model="formData.packagingMaterial"
                    :items="packagingMaterials"
                    label="What packaging material are you using?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                  ></v-select>
                  <v-select
                    v-model="formData.labelFinish"
                    :items="finishes"
                    label="What finish do you prefer on the label?"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                  ></v-select>
                  <v-radio-group v-model="formData.uploadBrandingAssets" inline class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Would you like to upload branding assets now?</span>
                    </template>
                    <v-radio label="Yes" value="yes" color="#8B5CF6"></v-radio>
                    <v-radio label="No" value="no" color="#8B5CF6"></v-radio>
                  </v-radio-group>

                  <div v-if="formData.uploadBrandingAssets === 'yes'" class="branding-asset-uploads">
                    <v-file-input
                      v-model="formData.brandingAssets.logo"
                      label="Logo (SVG/PNG)"
                      variant="outlined"
                      density="comfortable"
                      class="custom-input form-field-margin"
                      bg-color="#1a1a1a"
                      color="#8B5CF6"
                      hide-details
                      prepend-icon="mdi-image"
                      show-size
                      counter
                    ></v-file-input>
                    <v-file-input
                      v-model="formData.brandingAssets.fonts"
                      label="Fonts (OTF/TTF)"
                      variant="outlined"
                      density="comfortable"
                      class="custom-input form-field-margin"
                      bg-color="#1a1a1a"
                      color="#8B5CF6"
                      hide-details
                      prepend-icon="mdi-format-font"
                      show-size
                      counter
                    ></v-file-input>
                    <v-file-input
                      v-model="formData.brandingAssets.barcode"
                      label="Barcode (SVG/PNG)"
                      variant="outlined"
                      density="comfortable"
                      class="custom-input form-field-margin"
                      bg-color="#1a1a1a"
                      color="#8B5CF6"
                      hide-details
                      prepend-icon="mdi-barcode"
                      show-size
                      counter
                    ></v-file-input>
                    <v-file-input
                      v-model="formData.brandingAssets.dielines"
                      label="Dielines (PDF/AI)"
                      variant="outlined"
                      density="comfortable"
                      class="custom-input form-field-margin"
                      bg-color="#1a1a1a"
                      color="#8B5CF6"
                      hide-details
                      prepend-icon="mdi-vector-polyline"
                      show-size
                      counter
                    ></v-file-input>
                    <v-file-input
                      v-model="formData.brandingAssets.references"
                      label="References (DOCX/PPTX)"
                      variant="outlined"
                      density="comfortable"
                      class="custom-input form-field-margin"
                      bg-color="#1a1a1a"
                      color="#8B5CF6"
                      hide-details
                      prepend-icon="mdi-file-document-outline"
                      show-size
                      counter
                    ></v-file-input>
                  </div>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 6: Content Review & Dimensions -->
            <v-window-item :value="6">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Content Review & Dimensions</h3>
                  <div class="content-summary-card">
                    <h4>Your Current Content Summary:</h4>
                    <p><strong>Product Name:</strong> {{ formData.productName || 'N/A' }}</p>
                    <p><strong>Description:</strong> {{ formData.productDescription || 'N/A' }}</p>
                    <p><strong>Ingredients:</strong> {{ formData.ingredients || 'N/A' }}</p>
                    <p><strong>Net Weight/Volume:</strong> {{ formData.netWeightVolume || 'N/A' }}</p>
                    <p><strong>Usage:</strong> {{ formData.productUsage || 'N/A' }}</p>
                    <p><strong>Warnings:</strong> {{ formData.safetyWarnings || 'N/A' }}</p>
                    <p><strong>Label Type:</strong> {{ formData.labelType || 'N/A' }}</p>
                    <p><strong>Packaging Material:</strong> {{ formData.packagingMaterial || 'N/A' }}</p>
                    <p><strong>Label Finish:</strong> {{ formData.labelFinish || 'N/A' }}</p>
                  </div>

                  <v-radio-group v-model="formData.editContent" inline class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Here’s your content summary. Do you want to edit or add any information?</span>
                    </template>
                    <v-radio label="Yes" value="yes" color="#8B5CF6"></v-radio>
                    <v-radio label="No" value="no" color="#8B5CF6"></v-radio>
                  </v-radio-group>

                  <v-radio-group v-model="formData.addMissingFields" inline class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Do you want to add any missing fields such as allergen statements, expiration date, etc.?</span>
                    </template>
                    <v-radio label="Yes" value="yes" color="#8B5CF6"></v-radio>
                    <v-radio label="No" value="no" color="#8B5CF6"></v-radio>
                  </v-radio-group>

                  <h4 class="mt-4 text-white">Confirm or adjust your label dimensions:</h4>
                  <v-text-field
                    v-model="formData.labelWidth"
                    label="Width in mm"
                    type="number"
                    suffix="mm"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    clearable
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.labelHeight"
                    label="Height in mm"
                    type="number"
                    suffix="mm"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    clearable
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.labelBleed"
                    label="Bleed in mm (extra space beyond label edge)"
                    type="number"
                    suffix="mm"
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

            <!-- Step 7: Flat-Label Generation -->
            <v-window-item :value="7">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Flat-Label Generation</h3>
                  <v-radio-group v-model="formData.generateFlatLabel" inline class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Would you like to generate a flat-label preview now?</span>
                    </template>
                    <v-radio label="Yes" value="yes" color="#8B5CF6"></v-radio>
                    <v-radio label="No" value="no" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                  <v-radio-group v-if="formData.generateFlatLabel === 'yes'" v-model="formData.reviewBeforeExport" inline class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Do you want to review it before export? (Optional)</span>
                    </template>
                    <v-radio label="Yes" value="yes" color="#8B5CF6"></v-radio>
                    <v-radio label="No" value="no" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 8: Mockup Generation -->
            <v-window-item :value="8">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Product Mockup Generation</h3>
                  <v-radio-group v-model="formData.generateMockup" inline class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Do you want to generate a product mockup now?</span>
                    </template>
                    <v-radio label="Yes" value="yes" color="#8B5CF6"></v-radio>
                    <v-radio label="No" value="no" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                  <div v-if="formData.generateMockup === 'yes'" class="form-field-margin">
                    <h4 class="text-white mb-2">Which mockup views do you want?</h4>
                    <v-checkbox
                      v-for="view in mockupViews"
                      :key="view"
                      v-model="formData.mockupViews"
                      :label="view"
                      :value="view.toLowerCase()"
                      color="#8B5CF6"
                      hide-details
                      class="custom-checkbox"
                    ></v-checkbox>
                  </div>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 9: Export Options -->
            <v-window-item :value="9">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Export Options</h3>
                  <h4 class="text-white mb-2">Which formats do you want to export your label and mockup in?</h4>
                  <v-checkbox
                    v-for="format in exportFormats"
                    :key="format"
                    v-model="formData.exportFormats"
                    :label="format"
                    :value="format.toLowerCase()"
                    color="#8B5CF6"
                    hide-details
                    class="custom-checkbox"
                  ></v-checkbox>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Step 10: Packaging Summary Report -->
            <v-window-item :value="10">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Packaging Summary Report</h3>
                  <v-radio-group v-model="formData.downloadReport" inline class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Would you like to download a packaging summary report?</span>
                    </template>
                    <v-radio label="Yes" value="yes" color="#8B5CF6"></v-radio>
                    <v-radio label="No" value="no" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                  <v-radio-group v-if="formData.downloadReport === 'yes'" v-model="formData.reportFormat" inline class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Do you want it in .txt or .json format?</span>
                    </template>
                    <v-radio label=".txt" value="txt" color="#8B5CF6"></v-radio>
                    <v-radio label=".json" value="json" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                </div>
              </v-fade-transition>
            </v-window-item>

            <!-- Final Step / Summary -->
            <v-window-item :value="11">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">All Done!</h3>
                  <p class="step-description">
                    You've provided all the necessary information.
                    Click "Generate Label" to finalize your project!
                  </p>
                  <v-btn
                    block
                    color="#7C3AED"
                    size="large"
                    class="generate-button"
                    @click="generateLabel"
                  >
                    Generate Label
                    <v-icon right>mdi-check-circle-outline</v-icon>
                  </v-btn>
                </div>
              </v-fade-transition>
            </v-window-item>
          </v-window>

          <div class="navigation-buttons">
            <v-btn
              v-if="currentStep > 1"
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
              v-if="currentStep < totalSteps + 1"
              @click="nextStep"
              color="#8B5CF6"
              size="large"
              class="nav-button"
              :disabled="!isCurrentStepValid"
            >
              Next <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              v-if="currentStep === totalSteps + 1"
              @click="generateLabel"
              color="#7C3AED"
              size="large"
              class="nav-button"
            >
              Generate Label <v-icon right>mdi-check-circle-outline</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- This is now the RIGHT side (static branding/intro) -->
        <div class="left-panel">
          <div class="lebo-branding">
            <h2 class="lebo-title">Lebo GPT™ Studio</h2>
            <p class="lebo-subtitle">Your AI-powered guide to perfect product labels.</p>
            <p class="lebo-description">
              "I’m Lebo GPT v2.1. I’ll guide you through label creation, ensuring compliance and stunning design."
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
const totalSteps = 10;
const formData = reactive({
  conversationLanguage: 'English',
  labelContentLanguage: 'English',
  userRole: null,
  complianceRegion: null,
  productName: '',
  productDescription: '',
  ingredients: '',
  netWeightVolume: '',
  productUsage: '',
  safetyWarnings: '',
  productImage: null,
  labelType: null,
  recommendLabelType: 'no',
  packagingMaterial: null,
  labelFinish: null,
  uploadBrandingAssets: 'no',
  brandingAssets: {
    logo: null,
    fonts: null,
    barcode: null,
    dielines: null,
    references: null,
  },
  editContent: 'no',
  addMissingFields: 'no',
  labelWidth: null,
  labelHeight: null,
  labelBleed: null,
  generateFlatLabel: 'no',
  reviewBeforeExport: 'no',
  generateMockup: 'no',
  mockupViews: [],
  exportFormats: [],
  downloadReport: 'no',
  reportFormat: null,
});

const previewImageUrl = ref(null);

const languages = ['Kiswahili', 'English', 'French', 'German', 'Portuguese', 'Mandarin/Chinese', 'Arabic', 'Spanish'];
const userRoles = ['Business Owner', 'Designer', 'Regulatory Agent', 'Developer'];
const regions = ['Tanzania', 'EAC', 'EU', 'USA', 'GCC', 'Other'];
const labelTypes = ['Primary', 'Wrap-Around', 'Nutritional Panel', 'Herbal/Remedy', 'Agricultural/Organic', 'Cosmetic', 'Pharmaceutical', 'Hazardous Material', 'Baby/Childcare', 'Electronics'];
const packagingMaterials = ['PET', 'Glass', 'Aluminum', 'Paperboard', 'Plastic Pouch'];
const finishes = ['Matte', 'Gloss'];
const mockupViews = ['Flat', 'Wrap', 'MultiSide', 'Isometric', 'Top'];
const exportFormats = ['PNG', 'JPEG', 'PDF', 'SVG', 'DOCX', 'AI', 'TIFF', 'TXT', 'JSON', 'ZIP'];

const progressPercentage = computed(() => {
  return (currentStep.value / totalSteps) * 100;
});

const displayPreview = computed(() => {
  return currentStep.value >= 7 && previewImageUrl.value !== null;
});

watch(currentStep, (newStep) => {
  if (newStep === 7 && formData.generateFlatLabel === 'yes') {
    previewImageUrl.value = 'https://placehold.co/400x300/A78BFA/FFFFFF?text=Flat+Label';
  } else if (newStep === 8 && formData.generateMockup === 'yes' && formData.mockupViews.length > 0) {
    previewImageUrl.value = 'https://placehold.co/400x300/8B5CF6/FFFFFF?text=3D+Mockup';
  } else {
    previewImageUrl.value = null;
  }
}, { immediate: true });

const isCurrentStepValid = computed(() => {
  switch (currentStep.value) {
    case 1: return true;
    case 2:
      return formData.conversationLanguage && formData.labelContentLanguage && formData.userRole;
    case 3:
      return formData.complianceRegion;
    case 4:
      return formData.productName.trim() !== '';
    case 5:
      return formData.labelType && formData.packagingMaterial && formData.labelFinish &&
             formData.recommendLabelType && formData.uploadBrandingAssets;
    case 6:
      return formData.editContent && formData.addMissingFields &&
             formData.labelWidth !== null && formData.labelWidth >= 0 &&
             formData.labelHeight !== null && formData.labelHeight >= 0 &&
             formData.labelBleed !== null && formData.labelBleed >= 0;
    case 7:
      if (formData.generateFlatLabel === 'yes') {
        return formData.reviewBeforeExport !== null;
      }
      return formData.generateFlatLabel !== null;
    case 8:
      if (formData.generateMockup === 'yes') {
        return formData.mockupViews.length > 0;
      }
      return formData.generateMockup !== null;
    case 9:
      return formData.exportFormats.length > 0;
    case 10:
      if (formData.downloadReport === 'yes') {
        return formData.reportFormat !== null;
      }
      return formData.downloadReport !== null;
    default: return true;
  }
});

const nextStep = () => {
  if (!isCurrentStepValid.value) {
    alert('Please fill in all required fields for this step.');
    return;
  }
  if (currentStep.value < totalSteps + 1) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const generateLabel = () => {
  alert('Generating label with the following data: ' + JSON.stringify(formData, null, 2));
};

const goBackToHome = () => {
  router.push('/homepage');
};
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}

.lebo-gpt-page-wrapper {
  min-height: 100vh;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
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
  overflow-y: auto;
  max-height: calc(100vh - 4rem);
}
@media (min-width: 768px) {
  .main-container {
    padding: 3rem;
  }
}

/* Header Styles (unchanged) */
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

/* Left Panel (now visually on LEFT) */
/* Renamed class for clarity, but kept original name in template for minimal diff */
.right-panel { /* This is the form/preview panel, now on the left */
  flex: 1.5;
  background-color: #1a1a1a;
  border-radius: 0.75rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  max-height: 100%;
  margin-bottom: 2rem;
}
@media (min-width: 1024px) {
  .right-panel {
    margin-right: 2rem;
    margin-bottom: 0;
  }
}

/* Right Panel (now visually on RIGHT) */
/* Renamed class for clarity, but kept original name in template for minimal diff */
.left-panel { /* This is the branding panel, now on the right */
  flex: 1;
  background-color: #1a1a1a;
  border-radius: 0.75rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.lebo-branding {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lebo-title {
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.lebo-subtitle {
  color: #9CA3AF;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.lebo-description {
  color: #D1D5DB;
  font-style: italic;
  font-size: 0.95rem;
  max-width: 400px;
}

/* Dynamic Preview Container and Image */
.dynamic-preview-container {
  margin-bottom: 2rem;
  text-align: center;
}

.dynamic-label-preview {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 0.75rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: block;
  margin: 0 auto;
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

/* --- FIXES FOR DROPDOWN AND RADIO BUTTONS --- */

/* Darker dropdown background for the overlay content */
.custom-input :deep(.v-overlay__content .v-list) {
  background-color: #2D2D2D !important; /* Targeting the v-list directly within the overlay */
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Text color for dropdown items */
.custom-input :deep(.v-list-item-title) {
  color: #E5E7EB !important;
}

/* Highlight color for active/selected dropdown item */
.custom-input :deep(.v-list-item--active .v-list-item-title) {
  color: #8B5CF6 !important;
}

/* Subtle background for active/hovered dropdown item */
.custom-input :deep(.v-list-item--active) {
  background-color: rgba(139, 92, 246, 0.1) !important;
}

/* Ensure input text is white */
.custom-input .v-field__input {
  color: #E5E7EB !important;
}

/* Ensure label for input is grey */
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

/* --- END FIXES --- */

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

/* Navigation Buttons (unchanged) */
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
