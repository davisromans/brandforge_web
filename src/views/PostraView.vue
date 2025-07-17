<template>
  <div class="postra-page-wrapper font-inter">
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
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Welcome to Postra™!</h3>
                  <p class="step-description">
                    "👋 Hello and welcome to Postra—your all-in-one AI design assistant. I’m here to help you create stunning posters, flyers, social ads, brochures and more, in a single chat."
                    <br><br>
                    Tagline: "Design Less. Impress More."
                  </p>
                </div>
              </v-fade-transition>
            </v-window-item>

            <v-window-item :value="2">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Select Artifact Type</h3>
                  <v-select
                    v-model="formData.artifactType"
                    :items="artifactTypes"
                    label="What do you want to build today? Please choose a number:"
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

            <v-window-item :value="3">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Industry & Use-Case</h3>
                  <v-text-field
                    v-model="formData.industryUseCase"
                    label="Now tell me your industry or use-case."
                    hint="(e.g., Education campaign)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    clearable
                    required
                  ></v-text-field>
                </div>
              </v-fade-transition>
            </v-window-item>

            <v-window-item :value="4">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Choose Fusion Style</h3>
                  <v-select
                    v-model="formData.fusionStyle1"
                    :items="fusionStyles"
                    label="Pick your first style to blend:"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    clearable
                  ></v-select>
                  <v-select
                    v-model="formData.fusionStyle2"
                    :items="fusionStyles"
                    label="Pick your second style to blend:"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    clearable
                  ></v-select>
                  <v-text-field
                    v-model="formData.blendRatio"
                    label="Specify a blend ratio (e.g., 60:40) or a preset (e.g., NeoBrutalScandi (50/50)). (Optional)"
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

            <v-window-item :value="5">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Typography Framework</h3>
                  <v-radio-group v-model="formData.fontSource" class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">"We support a curated library of variable fonts. Want to upload your own (OTF/TTF), or use one of ours (e.g. Montserrat, Inter)?"</span>
                    </template>
                    <v-radio label="Upload my own" value="upload" color="#8B5CF6"></v-radio>
                    <v-radio label="Use yours" value="use_ours" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                  <v-file-input
                    v-if="formData.fontSource === 'upload'"
                    v-model="formData.uploadedFonts"
                    label="Upload your fonts (OTF/TTF)"
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
                  <v-select
                    v-if="formData.fontSource === 'use_ours'"
                    v-model="formData.selectedFont"
                    :items="curatedFonts"
                    label="Select a font from our library"
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

            <v-window-item :value="6">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Canvas Size Setup</h3>
                  <p class="step-description">
                    "I’ll automatically select the ideal size. For Posters, it’s A2 (420×594 mm) with 3 mm bleed at 300 DPI. Want a different dimension?"
                  </p>
                  <v-radio-group v-model="formData.customDimensions" inline class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Use custom dimensions?</span>
                    </template>
                    <v-radio label="Yes" value="yes" color="#8B5CF6"></v-radio>
                    <v-radio label="No (use A2 default)" value="no" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                  <div v-if="formData.customDimensions === 'yes'">
                    <v-text-field
                      v-model="formData.canvasWidth"
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
                      v-model="formData.canvasHeight"
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
                      v-model="formData.canvasBleed"
                      label="Bleed in mm"
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
                      v-model="formData.canvasDPI"
                      label="DPI"
                      type="number"
                      variant="outlined"
                      density="comfortable"
                      class="custom-input form-field-margin"
                      bg-color="#1a1a1a"
                      color="#8B5CF6"
                      hide-details
                      clearable
                    ></v-text-field>
                  </div>
                </div>
              </v-fade-transition>
            </v-window-item>

            <v-window-item :value="7">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Define Layout Sections & Import Assets</h3>
                  <h4 class="text-white mb-2">How would you like to divide your design? Common sections:</h4>
                  <v-checkbox
                    v-for="section in layoutSections"
                    :key="section"
                    v-model="formData.layoutSections"
                    :label="section"
                    :value="section.toLowerCase().replace(/ /g, '-')"
                    color="#8B5CF6"
                    hide-details
                    class="custom-checkbox"
                  ></v-checkbox>
                  <v-textarea
                    v-model="formData.sectionContent"
                    label="User selects and defines content for sections (e.g., Header: 'Event Name', Body Text: 'Details here')"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    rows="3"
                  ></v-textarea>

                  <h4 class="mt-4 text-white">Upload additional assets for your poster:</h4>
                  <v-file-input
                    v-model="formData.posterAssets.images"
                    label="Images (JPG/PNG)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    prepend-icon="mdi-image-multiple"
                    show-size
                    counter
                    multiple
                  ></v-file-input>
                  <v-file-input
                    v-model="formData.posterAssets.vectors"
                    label="Vectors (SVG/AI)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    prepend-icon="mdi-vector-polyline"
                    show-size
                    counter
                    multiple
                  ></v-file-input>
                  <v-file-input
                    v-model="formData.posterAssets.logos"
                    label="Logos (SVG/PNG)"
                    variant="outlined"
                    density="comfortable"
                    class="custom-input form-field-margin"
                    bg-color="#1a1a1a"
                    color="#8B5CF6"
                    hide-details
                    prepend-icon="mdi-hexagon-multiple-outline"
                    show-size
                    counter
                    multiple
                  ></v-file-input>
                </div>
              </v-fade-transition>
            </v-window-item>

            <v-window-item :value="8">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Draft Generation</h3>
                  <p class="step-description">
                    "Generating your draft…"
                    <br><br>
                    "Here’s your first draft preview. Let me know what to tweak."
                  </p>
                  <v-radio-group v-model="formData.reviewDraft" inline class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Do you want to review it before export?</span>
                    </template>
                    <v-radio label="Yes" value="yes" color="#8B5CF6"></v-radio>
                    <v-radio label="No" value="no" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                </div>
              </v-fade-transition>
            </v-window-item>

            <v-window-item :value="9">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Sectional Review & Refinement</h3>
                  <h4 class="text-white mb-2">Which section would you like to refine?</h4>
                  <v-checkbox
                    v-for="section in reviewSections"
                    :key="section"
                    v-model="formData.sectionsToRefine"
                    :label="section"
                    :value="section.toLowerCase().replace(/ /g, '-')"
                    color="#8B5CF6"
                    hide-details
                    class="custom-checkbox"
                  ></v-checkbox>
                  <p class="step-description mt-4">
                    "Iterative editing continues..."
                  </p>
                </div>
              </v-fade-transition>
            </v-window-item>

            <v-window-item :value="10">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">QA & Finalization</h3>
                  <p class="step-description">
                    "Running QA:
                    <br>• Contrast ratios (WCAG)
                    <br>• Bleed & crop marks
                    <br>• Resolution (DPI)"
                    <br><br>
                    "Everything looks good! Shall I package your assets?"
                  </p>
                  <v-radio-group v-model="formData.packageAssets" inline class="form-field-margin">
                    <template v-slot:label>
                      <span class="radio-checkbox-label">Package your assets?</span>
                    </template>
                    <v-radio label="Yes" value="yes" color="#8B5CF6"></v-radio>
                    <v-radio label="No" value="no" color="#8B5CF6"></v-radio>
                  </v-radio-group>
                </div>
              </v-fade-transition>
            </v-window-item>

            <v-window-item :value="11">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Export & Delivery</h3>
                  <h4 class="text-white mb-2">Which formats do you want to export your poster in?</h4>
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
                  <p class="step-description mt-4">
                    "🎉 Your design is ready! Download here: [link]"
                    <br>
                    "Thanks for using Postra—Design Less. Impress More."
                  </p>
                </div>
              </v-fade-transition>
            </v-window-item>

            <v-window-item :value="12">
              <v-fade-transition>
                <div class="step-content">
                  <h3 class="step-title">Project Complete!</h3>
                  <p class="step-description">
                    Your Postra design is finalized and ready for use.
                  </p>
                  <v-btn
                    block
                    color="#7C3AED"
                    size="large"
                    class="generate-button"
                    @click="downloadFinalDesign"
                  >
                    Download Final Design
                    <v-icon right>mdi-download</v-icon>
                  </v-btn>
                </div>
              </v-fade-transition>
            </v-window-item>
          </v-window>

          <div class="navigation-buttons">
            <v-btn
              v-if="currentStep > 1 && currentStep <= totalSteps + 1"
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
              @click="downloadFinalDesign"
              color="#7C3AED"
              size="large"
              class="nav-button"
            >
              Download <v-icon right>mdi-download</v-icon>
            </v-btn>
          </div>
        </div>

        <div class="right-branding-panel">
          <div v-if="displayPreview" class="dynamic-preview-container">
            <v-btn
              color="#7C3AED"
              size="small"
              class="download-button"
              prepend-icon="mdi-download"
              @click="downloadPreview"
            >
              Download Preview
            </v-btn>
            <img :src="previewImageUrl" alt="Generated Poster Preview" class="dynamic-poster-preview" />
          </div>
          <div v-else class="postra-branding">
            <h2 class="postra-title">Postra™ Studio</h2>
            <p class="postra-subtitle">Your all-in-one AI design assistant.</p>
            <p class="postra-description">
              "Design Less. Impress More."
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
const totalSteps = 11;

const formData = reactive({
  artifactType: null,
  industryUseCase: '',
  fusionStyle1: null,
  fusionStyle2: null,
  blendRatio: '',
  fontSource: null,
  uploadedFonts: null,
  selectedFont: null,
  customDimensions: 'no',
  canvasWidth: null,
  canvasHeight: null,
  canvasBleed: null,
  canvasDPI: null,
  layoutSections: [],
  sectionContent: '',
  posterAssets: {
    images: null,
    vectors: null,
    logos: null,
  },
  reviewDraft: null,
  sectionsToRefine: [],
  packageAssets: null,
  exportFormats: [],
});

const previewImageUrl = ref(null);

const artifactTypes = ['Poster/Flyer', 'Social Ad', 'Brochure'];
const fusionStyles = ['GlobalModern', 'OldSchoolRetro', 'ScandiMinimal', 'NeoBrutalism', 'Glassmorphism', 'WabiSabi'];
const curatedFonts = ['Montserrat', 'Inter', 'Open Sans', 'Roboto'];
const layoutSections = ['Header', 'Hero Image', 'Body Text', 'Call-to-Action', 'Footer'];
const reviewSections = ['Header', 'Hero Image', 'Body Text', 'Call-to-Action', 'Footer', 'Run QA Checks', 'Approve & Finalize'];
const exportFormats = ['PNG', 'JPG', 'PDF', 'SVG', 'PPTX', 'ZIP'];

const progressPercentage = computed(() => {
  return (currentStep.value / totalSteps) * 100;
});

const displayPreview = computed(() => {
  return currentStep.value >= 8 && previewImageUrl.value !== null;
});

watch(currentStep, (newStep) => {
  if (newStep >= 8) {
    if (newStep === 8) {
      previewImageUrl.value = 'https://placehold.co/400x560/A78BFA/FFFFFF?text=Draft+Poster';
    } else if (newStep === 9) {
      previewImageUrl.value = 'https://placehold.co/400x560/8B5CF6/FFFFFF?text=Refined+Poster';
    } else if (newStep >= 10) {
      previewImageUrl.value = 'https://placehold.co/400x560/7C3AED/FFFFFF?text=Final+Poster';
    }
  } else {
    previewImageUrl.value = null;
  }
}, { immediate: true });

const isCurrentStepValid = computed(() => {
  switch (currentStep.value) {
    case 1: return true;
    case 2: return formData.artifactType !== null;
    case 3: return formData.industryUseCase.trim() !== '';
    case 4: return true;
    case 5:
      if (formData.fontSource === 'upload') {
        return formData.uploadedFonts !== null;
      } else if (formData.fontSource === 'use_ours') {
        return formData.selectedFont !== null;
      }
      return formData.fontSource !== null;
    case 6:
      if (formData.customDimensions === 'yes') {
        return formData.canvasWidth !== null && formData.canvasWidth >= 0 &&
               formData.canvasHeight !== null && formData.canvasHeight >= 0 &&
               formData.canvasBleed !== null && formData.canvasBleed >= 0 &&
               formData.canvasDPI !== null && formData.canvasDPI >= 0;
      }
      return formData.customDimensions !== null;
    case 7: return formData.layoutSections.length > 0;
    case 8: return formData.reviewDraft !== null;
    case 9: return formData.sectionsToRefine.length > 0 || formData.sectionsToRefine.includes('approve-&-finalize');
    case 10: return formData.packageAssets !== null;
    case 11: return formData.exportFormats.length > 0;
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

const downloadPreview = () => {
  if (previewImageUrl.value) {
    const link = document.createElement('a');
    link.href = previewImageUrl.value;
    link.download = 'postra_poster_preview.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Downloading poster preview!');
  } else {
    alert('No preview available to download.');
  }
};

const downloadFinalDesign = () => {
  alert('Downloading final Postra design!');
  downloadPreview();
};

const goBackToHome = () => {
  router.push('/');
};
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}

.postra-page-wrapper {
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
  min-height: 80vh;
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

.content-area {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
@media (min-width: 1024px) {
  .content-area {
    flex-direction: row;
  }
}

.left-content-panel {
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
  .left-content-panel {
    margin-right: 2rem;
    margin-bottom: 0;
  }
}

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
  position: relative;
}

.postra-branding {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.postra-title {
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.postra-subtitle {
  color: #9CA3AF;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.postra-description {
  color: #D1D5DB;
  font-style: italic;
  font-size: 0.95rem;
  max-width: 400px;
}

.dynamic-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.dynamic-poster-preview {
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
  top: 1rem;
  right: 1rem;
  z-index: 10;
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

.radio-checkbox-label,
.v-radio :deep(.v-label),
.v-checkbox :deep(.v-label) {
  color: #E5E7EB !important;
  font-size: 0.875rem;
}

.custom-checkbox .v-selection-control__wrapper {
  color: #8B5CF6 !important;
}

/* Specific targeting for inactive radio/checkbox circles/squares */
.v-radio .v-selection-control__wrapper .v-icon,
.v-checkbox .v-selection-control__wrapper .v-icon {
  color: #D1D5DB !important; /* Light gray for inactive icons */
}

/* Specific targeting for the actual checkbox/radio input elements when NOT checked */
.v-radio:not(.v-selection-control--dirty) .v-selection-control__wrapper,
.v-checkbox:not(.v-selection-control--dirty) .v-selection-control__wrapper {
  color: #D1D5DB !important;
}


.v-file-input :deep(.v-input__prepend) .v-icon {
  color: #E5E7EB !important;
}

.step-content .v-icon {
  color: #E5E7EB !important;
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
