<template>
  <div class="tips-guidance-page-wrapper font-inter">
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
        <h1 class="page-title">Tips & Guidance</h1>
        <p class="page-subtitle">Learn how to make the most of BrandForge AI and unlock your creative potential.</p>

        <v-expansion-panels flat class="tips-panels-container">
          <v-expansion-panel
            v-for="(tip, i) in tips"
            :key="i"
            :title="tip.title"
            class="tip-expansion-panel"
          >
            <template v-slot:text>
              <div class="panel-content">
                <p class="panel-description">{{ tip.description }}</p>
                <ul v-if="tip.points" class="tip-points-list mt-4">
                  <li v-for="(point, pIdx) in tip.points" :key="pIdx">
                    <div class="key-line">
                      <v-icon small class="mr-2 text-purple-400">mdi-lightbulb-on-outline</v-icon>
                      <strong class="key-text">{{ point.key }}</strong>
                    </div>
                    <p class="point-description">{{ point.text }}</p>
                  </li>
                </ul>
              </div>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Restructured points data to have separate key and text properties
const tips = ref([
  {
    title: 'Getting Started with LogoCraft™: Crafting Your Brand Identity',
    description: 'LogoCraft is designed to help you create stunning and memorable logos with the power of AI. Whether you\'re starting from scratch or refining an existing design, these tips will guide you through the process.',
    points: [
      { key: 'Define Your Brand Clearly:', text: 'Before you begin, spend some time defining your brand\'s core values, mission, and unique selling proposition. This clarity will significantly help the AI generate relevant and impactful designs.' },
      { key: 'Strategic Keyword Selection:', text: 'When prompted for brand keywords, choose 3-5 words that genuinely reflect your brand\'s essence, target audience, and desired emotional response (e.g., "innovative," "eco-friendly," "luxury," "playful," "minimalist"). These keywords heavily influence AI suggestions.' },
      { key: 'Explore Logo Types:', text: 'Don\'t limit yourself to a single idea. Experiment with various logo types like wordmarks, lettermarks, iconic symbols, emblems, or even 3D designs. LogoCraft can adapt to different styles, so try multiple options to discover what resonates best.' },
      { key: 'Leverage Style Blending:', text: 'Utilize the "Blend Styles" feature to combine distinct visual aesthetics, such as "Afro-Minimalist" with "Futuristic Tech" or "Vintage" with "Global Modern." This allows for truly unique and hybrid designs that stand out.' },
      { key: 'Consider Font Psychology:', text: 'If you have a preferred font style (serif, sans-serif, display), specify it. Otherwise, trust LogoCraft\'s AI to recommend fonts that align with your brand tone. Remember, fonts evoke emotion and communicate personality.' },
      { key: 'Input Color Preferences:', text: 'Provide preferred colors or HEX codes early on. This helps the AI integrate your brand\'s color palette from the initial design stages, ensuring consistency and visual harmony.' },
      { key: 'Refine Existing Logos Effectively:', text: 'If improving an existing logo, clearly state your improvement goals (e.g., "modernize color palette," "simplify icon," "enhance layout"). Specify which elements must be preserved to avoid unnecessary changes and maintain brand recognition.' },
    ],
  },
  {
    title: 'Mastering Lebo GPT™ for Labels: Compliance & Design Excellence',
    description: 'Lebo GPT streamlines product label creation, ensuring both regulatory compliance and aesthetic appeal. Follow these guidelines to navigate the process efficiently and produce professional labels.',
    points: [
      { key: 'Prioritize Compliance Region:', text: 'Always select the correct compliance region at the start. Lebo GPT tailors regulatory requirements (e.g., ingredient lists, warnings, nutritional facts) based on your chosen region, minimizing legal risks and ensuring market readiness.' },
      { key: 'Provide Comprehensive Product Information:', text: 'The more detailed and accurate your product description, ingredients, net weight/volume, usage instructions, and safety warnings, the more precise and complete your label content will be. This is crucial for both compliance and consumer clarity.' },
      { key: 'Explore Label Type Recommendations:', text: 'If unsure, allow Lebo GPT to recommend the best label type for your product (e.g., primary, wrap-around, nutritional panel). The AI analyzes your product details to suggest optimal formats.' },
      { key: 'Specify Packaging Details:', text: 'Inform the AI about your packaging material (e.g., PET, glass, aluminum) and desired label finish (matte, gloss). This allows Lebo GPT to create realistic mockups and consider material compatibility for design elements.' },
      { key: 'Upload High-Quality Branding Assets:', text: 'For accurate mockups and brand consistency, upload your logo (SVG/PNG), brand fonts (OTF/TTF), barcodes, and existing dielines (PDF/AI) early in the process. This helps the AI integrate them seamlessly.' },
      { key: 'Review Content Summary Critically:', text: 'Before final generation, carefully review the AI-generated content summary. Make any necessary edits or add missing fields (e.g., allergen statements, expiration dates, batch numbers) to ensure all required information is present.' },
      { key: 'Utilize Mockup Views:', text: 'Take advantage of the various mockup views (Flat, Wrap, Multi-Side, Isometric, Top) to visualize your label on the actual product. This helps in identifying potential design flaws or alignment issues before production.' },
      { key: 'Generate Packaging Summary Reports:', text: 'For detailed record-keeping and internal documentation, generate a packaging summary report. Choose between .txt or .json format for easy data integration and review.' },
    ],
  },
  {
    title: 'Designing with Postra™ Studio: Creating Impactful Visuals',
    description: 'Postra Studio is your go-to AI assistant for crafting stunning posters, flyers, social ads, and brochures. Maximize your design impact with these essential tips.',
    points: [
      { key: 'Choose the Right Artifact Type:', text: 'Begin by selecting the appropriate artifact type (Poster/Flyer, Social Ad, Brochure). This sets the foundational design parameters and ensures the AI optimizes for the intended medium and purpose.' },
      { key: 'Clearly Define Industry & Use-Case:', text: 'Specify your industry or use-case (e.g., "Education campaign," "Tech product launch," "Charity fundraiser"). This context helps the AI understand your target audience and design objectives, leading to more relevant outputs.' },
      { key: 'Experiment with Fusion Styles & Ratios:', text: 'Postra excels at blending visual styles. Try combinations like "Neo-Brutalism" and "Scandi-Minimal" or "Global Modern" with "Old School Retro." Experiment with blend ratios (e.g., "60:40" or "NeoBrutalScandi (50/50)") to fine-tune the aesthetic mix.' },
      { key: 'Select Appropriate Typography:', text: 'Decide whether to upload your custom fonts (OTF/TTF) for unique branding or select from Postra\'s curated library (e.g., Montserrat, Inter). Consistent typography is key to professional design.' },
      { key: 'Confirm Canvas Size & Bleed:', text: 'While Postra suggests ideal dimensions (e.g., A2 for posters with 3mm bleed at 300 DPI), you have the option to set custom dimensions. Always ensure bleed and DPI settings are correct for print readiness.' },
      { key: 'Organize Layout Sections:', text: 'Clearly define the content for common layout sections (Header, Hero Image, Body Text, Call-to-Action, Footer). This structured approach helps the AI arrange content logically and visually appealingly.' },
      { key: 'Import Diverse Assets:', text: 'Upload all relevant images (JPG/PNG), vectors (SVG/AI), and logos (SVG/PNG). High-quality assets contribute significantly to the overall professional appearance of your design.' },
      { key: 'Utilize Iterative Refinement:', text: 'After generating a draft, use the sectional review feature to refine specific areas. This iterative editing allows you to fine-tune elements until the design meets your exact vision.' },
      { key: 'Leverage QA Checks:', text: 'Before finalization, Postra runs automated QA checks for contrast ratios (WCAG), bleed & crop marks, and resolution (DPI). Pay attention to these checks to ensure your design is print-ready and accessible.' },
    ],
  },
  {
    title: 'Understanding AI-Powered Suggestions: Your Creative Partner',
    description: 'BrandForge AI is more than just a tool; it\'s a creative partner. Understanding how its suggestions work will help you collaborate more effectively with the system.',
    points: [
      { key: 'Contextual Generation:', text: 'AI suggestions are highly dependent on the context and data you provide. The more detailed and specific your initial inputs across all studios, the more tailored and useful the AI\'s recommendations will be.' },
      { key: 'Trend-Awareness:', text: 'Our AI models are continuously updated with the latest design trends and industry standards. This means the suggestions you receive are often cutting-edge and market-relevant.' },
      { key: 'Flexibility is Key:', text: 'While AI provides strong starting points, remember that every suggestion can be modified. Don\'t hesitate to override colors, fonts, layouts, or stylistic elements if they don\'t perfectly align with your vision. Your creative input is paramount.' },
      { key: 'Iterative Learning:', text: 'The more you interact with BrandForge AI, refining designs and providing feedback (even implicit, through your choices), the better it becomes at understanding your preferences in future sessions (especially with Multi-brand Session enabled).' },
      { key: 'Function Explanations:', text: 'Keep "Function Explanations" turned ON in Smart System Settings to get insights into why the AI made certain design choices or how specific features impact the output. This helps you learn and make informed decisions.' },
      { key: 'Smart Prompting Assistant:', text: 'If you\'re ever unsure how to proceed or need inspiration, the Smart Prompting Assistant (currently planned for future release) can help guide your inputs and generate creative directions.' },
    ],
  },
  {
    title: 'Exporting and Asset Management: Maximizing Your Output',
    description: 'After all your hard work, ensuring your designs are properly exported and managed is crucial. BrandForge AI offers robust options to handle your final assets.',
    points: [
      { key: 'Choose Multiple Export Formats:', text: 'For versatility, export your designs in various formats like PNG for web, PDF for print, SVG for scalability, and DOCX/PPTX for presentations. Each format serves a different purpose, ensuring your design is ready for any platform.' },
      { key: 'Utilize ZIP Export for Projects:', text: 'When completing a project, select the ZIP export option to package all related assets (design files, fonts, mockups, reports) into a single, organized archive. This simplifies sharing and archiving your work.' },
      { key: 'Review Before Final Export:', text: 'Always take advantage of the "Review before Export" or "Show Preview" options. This final check allows you to catch any last-minute adjustments or ensure the AI\'s output perfectly matches your expectations before high-resolution generation.' },
      { key: 'Organize Project History:', text: 'The "Project History" page is not just for viewing; it\'s for managing. Regularly review your past projects, download older versions if needed, and ensure your creative portfolio within BrandForge AI remains organized.' },
      { key: 'Save Drafts Frequently:', text: 'While BrandForge AI often auto-saves, make a habit of explicitly saving drafts or generating previews at key milestones. This ensures you never lose progress and can easily revert to earlier stages if desired.' },
      { key: 'Consider Cloud Integration (Future):', text: 'While not yet fully implemented, future versions of BrandForge AI aim to offer direct integration with cloud storage services, further streamlining asset management and collaboration.' },
    ],
  },
]);


const goBackToHome = () => {
  router.push('/homepage');
};
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}

.tips-guidance-page-wrapper {
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centered as per instruction */
  text-align: center; /* Centered as per instruction */
}

.page-title {
  color: white;
  font-size: 2.5rem; /* Reverted to original font size */
  font-weight: bold;
  margin-bottom: 0.5rem;
  /* text-align: center; (inherited from content-area) */
}
@media (min-width: 768px) {
  .page-title {
    font-size: 3.5rem; /* Reverted to original font size */
  }
}

.page-subtitle {
  color: #9CA3AF; /* Reverted to original color */
  font-size: 1.1rem; /* Reverted to original font size */
  margin-bottom: 3rem;
  /* text-align: center; (inherited from content-area) */
}

.tips-panels-container {
  width: 100%;
  max-width: 800px;
  background-color: transparent !important;
}

.tip-expansion-panel {
  margin-bottom: 1rem;
  border-radius: 0.75rem !important;
  background-color: #1a1a1a !important;
  border: 1px solid #4B5563;
  color: #E5E7EB !important;
  /* text-align will be handled by nested elements if they're centered */
}

.tip-expansion-panel :deep(.v-expansion-panel-title) {
  font-weight: bold;
  font-size: 1.3rem; /* Adjusted font size for titles */
  color: white !important;
  padding: 1.25rem 1.5rem;
  text-align: left; /* Keep title text left-aligned for clarity */
}

.tip-expansion-panel :deep(.v-expansion-panel-text__wrapper) {
  padding: 0 1.5rem 1.5rem 1.5rem;
  text-align: center; /* Centered as per instruction */
}

.panel-content {
  text-align: center; /* Centered as per instruction */
}

.panel-description {
  color: #E5E7EB !important;
  font-size: 1.1rem; /* Increased font size */
  line-height: 1.6;
}

.tip-expansion-panel :deep(.v-expansion-panel-title__overlay) {
  background-color: transparent !important;
}

.tip-expansion-panel :deep(.v-expansion-panel-title--active) {
  background-color: rgba(139, 92, 246, 0.1) !important;
}

.tip-points-list {
  list-style: none;
  padding: 0;
  /* text-align: center; (inherited from panel-content) */
}

.tip-points-list li {
  display: flex;
  flex-direction: column; /* Stack key above text */
  align-items: center; /* Center horizontally */
  margin-bottom: 0.8rem; /* Increased space between points */
  color: #E5E7EB;
  font-size: 1.05rem; /* Increased font size */
  line-height: 1.5;
  text-align: center; /* Ensure key and text are centered */
  max-width: 90%; /* Constrain width to help centering on wide screens */
  margin-left: auto; /* Center the list item block */
  margin-right: auto; /* Center the list item block */
}

.key-line {
  display: flex;
  align-items: center; /* Align icon and key text horizontally */
  margin-bottom: 0.25rem; /* Space between key and description text */
  color: white; /* Key text color */
  font-size: 1.15rem; /* Slightly larger font for the key */
}

.key-line .v-icon {
  margin-right: 0.5rem;
  color: #A78BFA !important;
  flex-shrink: 0; /* Prevent icon from shrinking */
}

.key-line .key-text {
  font-weight: bold; /* Ensure bolding is applied */
}

.point-description {
  color: #E5E7EB; /* Text color */
  font-size: 1.05rem; /* Consistent with list item font size */
  text-align: center; /* Ensure text is centered */
}
</style>
