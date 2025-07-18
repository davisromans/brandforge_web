<template>
  <div class="project-history-page-wrapper font-inter">
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
        <h1 class="page-title">Project History</h1>
        <p class="page-subtitle">A chronological record of your BrandForge AI creations.</p>

        <div class="controls-area">
          <v-text-field
            v-model="searchQuery"
            label="Search projects..."
            variant="outlined"
            density="comfortable"
            class="custom-search-input"
            bg-color="#1a1a1a"
            color="#8B5CF6"
            hide-details
            clearable
            prepend-inner-icon="mdi-magnify"
            @input="filterProjects"
          ></v-text-field>

          <v-btn-toggle
            v-model="currentView"
            mandatory
            divided
            color="#8B5CF6"
            class="view-toggle"
          >
            <v-btn value="grid" icon>
              <v-icon>mdi-view-grid</v-icon>
            </v-btn>
            <v-btn value="list" icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
          </v-btn-toggle>
        </div>


        <div v-if="filteredProjects.length === 0" class="no-projects-message">
          <v-icon size="64" color="#9CA3AF">mdi-archive-outline</v-icon>
          <p class="mt-4 text-lg text-gray-400">No projects found matching your criteria. Start creating!</p>
          <v-btn
            color="#8B5CF6"
            size="large"
            class="mt-6 nav-button"
            @click="goBackToHome"
          >
            Go to Home
            <v-icon right>mdi-home-outline</v-icon>
          </v-btn>
        </div>

        <div v-else-if="currentView === 'grid'" class="projects-list-grid">
          <v-card
            v-for="project in filteredProjects"
            :key="project.id"
            class="project-card"
            dark
            flat
          >
            <v-card-title class="project-card-title">{{ project.name }}</v-card-title>
            <v-card-subtitle class="project-card-subtitle">{{ project.type }}</v-card-subtitle>
            <v-card-text class="project-card-details">
              <p><strong>Date:</strong> {{ project.date }}</p>
              <p><strong>Status:</strong> <v-chip :color="project.status === 'Completed' ? 'green' : 'orange'" size="small">{{ project.status }}</v-chip></p>
              <p><strong>Amount Paid:</strong> {{ project.amountPaid }}</p>
              <p v-if="project.lastModified"><strong>Last Modified:</strong> {{ project.lastModified }}</p>
            </v-card-text>
            <v-card-actions class="project-card-actions">
              <v-btn
                block
                color="#7C3AED"
                size="small"
                class="view-details-button"
                @click="openDetailsDialog(project)"
              >
                View Details
                <v-icon right>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>

        <div v-else-if="currentView === 'list'" class="projects-list-table">
          <v-table density="comfortable" class="custom-table">
            <thead>
              <tr>
                <th class="text-left">Project Name</th>
                <th class="text-left">Type</th>
                <th class="text-left">Date</th>
                <th class="text-left">Status</th>
                <th class="text-left">Amount Paid</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="project in filteredProjects"
                :key="project.id"
              >
                <td>{{ project.name }}</td>
                <td>{{ project.type }}</td>
                <td>{{ project.date }}</td>
                <td>
                  <v-chip :color="project.status === 'Completed' ? 'green' : 'orange'" size="small">
                    {{ project.status }}
                  </v-chip>
                </td>
                <td>{{ project.amountPaid }}</td>
                <td>
                  <v-btn
                    color="#7C3AED"
                    size="small"
                    variant="text"
                    @click="openDetailsDialog(project)"
                  >
                    View Details
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>
    </div>

    <v-dialog
      v-model="detailsDialog"
      max-width="600"
      class="custom-dialog"
    >
      <v-card class="dialog-card">
        <v-card-title class="dialog-title">
          Project Details: {{ selectedProject ? selectedProject.name : '' }}
          <v-spacer></v-spacer>
          <v-btn icon @click="detailsDialog = false" variant="text" color="red"> <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="dialog-content">
          <div v-if="selectedProject">
            <p><strong>Type:</strong> {{ selectedProject.type }}</p>
            <p><strong>Date:</strong> {{ selectedProject.date }}</p>
            <p><strong>Status:</strong>
              <v-chip :color="selectedProject.status === 'Completed' ? 'green' : 'orange'" size="small">
                {{ selectedProject.status }}
              </v-chip>
            </p>
            <p><strong>Amount Paid:</strong> {{ selectedProject.amountPaid }}</p>
            <p v-if="selectedProject.lastModified"><strong>Last Modified:</strong> {{ selectedProject.lastModified }}</p>

            <h3 class="mt-4 text-white">Generated Image:</h3>
            <div class="generated-image-preview">
              <img :src="selectedProject.generatedImageUrl" alt="Generated Project Image" class="responsive-image" />
              <v-btn
                color="#7C3AED"
                class="mt-4"
                prepend-icon="mdi-download"
                @click="downloadImage(selectedProject.generatedImageUrl, selectedProject.name)"
              >
                Download Image
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Reactive variables for view toggle, search, and dialog
const currentView = ref('grid'); // 'grid' or 'list'
const searchQuery = ref('');
const detailsDialog = ref(false);
const selectedProject = ref(null);

const projects = ref([
  {
    id: 'proj_001',
    name: 'Tech Innovators Logo',
    type: 'LogoCraft',
    date: '2024-06-15',
    status: 'Completed',
    amountPaid: 'TZS 150,000.00', // Changed to TZS
    lastModified: '2024-06-20',
    generatedImageUrl: 'https://placehold.co/400x300/A78BFA/FFFFFF?text=LogoCraft+Logo+1',
  },
  {
    id: 'proj_002',
    name: 'Event Poster Campaign',
    type: 'Postra',
    date: '2024-07-01',
    status: 'Completed',
    amountPaid: 'TZS 200,000.00', // Changed to TZS
    lastModified: '2024-07-05',
    generatedImageUrl: 'https://placehold.co/400x300/8B5CF6/FFFFFF?text=Postra+Poster+1',
  },
  {
    id: 'proj_003',
    name: 'New Product Label v1.0',
    type: 'LeboGPT',
    date: '2024-07-10',
    status: 'Not Completed',
    amountPaid: 'TZS 0.00', // Changed to TZS
    lastModified: '2024-07-17',
    generatedImageUrl: 'https://placehold.co/400x300/7C3AED/FFFFFF?text=LeboGPT+Label+1',
  },
  {
    id: 'proj_004',
    name: 'Global Conference Flyer',
    type: 'Postra',
    date: '2024-07-12',
    status: 'Completed',
    amountPaid: 'TZS 180,000.00', // Changed to TZS
    lastModified: '2024-07-15',
    generatedImageUrl: 'https://placehold.co/400x300/A78BFA/FFFFFF?text=Postra+Flyer+2',
  },
  {
    id: 'proj_005',
    name: 'Startup Brand Identity',
    type: 'LogoCraft',
    date: '2024-07-18',
    status: 'Not Completed',
    amountPaid: 'TZS 0.00', // Changed to TZS
    lastModified: '2024-07-18',
    generatedImageUrl: 'https://placehold.co/400x300/8B5CF6/FFFFFF?text=LogoCraft+Brand+2',
  },
  {
    id: 'proj_006',
    name: 'Beverage Bottle Label',
    type: 'LeboGPT',
    date: '2024-07-19',
    status: 'Completed',
    amountPaid: 'TZS 120,000.00', // Changed to TZS
    lastModified: '2024-07-20',
    generatedImageUrl: 'https://placehold.co/400x300/7C3AED/FFFFFF?text=LeboGPT+Bottle+Label',
  },
]);

// Computed property for filtering projects based on search query
const filteredProjects = computed(() => {
  if (!searchQuery.value) {
    return projects.value;
  }
  const query = searchQuery.value.toLowerCase();
  return projects.value.filter(project =>
    project.name.toLowerCase().includes(query) ||
    project.type.toLowerCase().includes(query) ||
    project.status.toLowerCase().includes(query)
  );
});

const filterProjects = () => {
  // This computed property automatically re-filters on searchQuery change
  // No explicit function body needed unless complex filtering logic is added
};

const goBackToHome = () => {
  router.push('/homepage');
};

const openDetailsDialog = (project) => {
  selectedProject.value = project;
  detailsDialog.value = true;
};

const downloadImage = (imageUrl, projectName) => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = `${projectName.replace(/\s/g, '_')}_generated_image.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  alert('Downloading image!');
};
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}

.project-history-page-wrapper {
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
  align-items: center;
  text-align: center;
}

.page-title {
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
@media (min-width: 768px) {
  .page-title {
    font-size: 3.5rem;
  }
}

.page-subtitle {
  color: #9CA3AF;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.controls-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 900px;
  margin-bottom: 2rem;
}
@media (min-width: 640px) {
  .controls-area {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .custom-search-input {
    flex-grow: 1;
    margin-right: 1rem;
  }
}

.custom-search-input :deep(.v-field__outline) {
  border-width: 1px !important;
  border-color: #4B5563 !important;
}

.custom-search-input :deep(.v-field__input) {
  color: #E5E7EB !important;
}

.custom-search-input :deep(.v-label) {
  color: #9CA3AF !important;
}

.view-toggle {
  background-color: #1a1a1a !important;
  border: 1px solid #4B5563 !important;
}
.view-toggle .v-btn {
  color: #D1D5DB !important;
}
.view-toggle .v-btn.v-btn--active {
  background-color: #8B5CF6 !important;
  color: white !important;
}


.no-projects-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.projects-list-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
  margin-bottom: 2rem;
}
@media (min-width: 640px) {
  .projects-list-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
@media (min-width: 1024px) {
  .projects-list-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-card {
  background-color: #1a1a1a !important;
  border-radius: 0.75rem !important;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #4B5563;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px -5px rgba(0, 0, 0, 0.6), 0 6px 10px -3px rgba(0, 0, 0, 0.3);
}

.project-card-title {
  color: white !important;
  font-size: 1.5rem !important;
  font-weight: bold !important;
  margin-bottom: 0.5rem;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  line-height: 1.2;
}

.project-card-subtitle {
  color: #A78BFA !important;
  font-size: 0.95rem !important;
  margin-bottom: 1rem;
}

.project-card-details {
  color: #D1D5DB !important;
  font-size: 0.9rem !important;
  padding: 0 !important;
  margin-bottom: 1.5rem;
  text-align: left;
}
.project-card-details p {
  margin-bottom: 0.25rem;
}
.project-card-details p strong {
  color: white;
}

.project-card-actions {
  padding: 0 !important;
  margin-top: auto;
}

.view-details-button {
  background-color: #7C3AED !important;
  border-radius: 0.5rem !important;
  font-weight: bold !important;
  color: white !important;
  text-transform: none !important;
  transition: background-color 0.3s ease;
}
.view-details-button:hover {
  background-color: #6D28D9 !important;
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

.projects-list-table {
  width: 100%;
  max-width: 1100px; /* Wider for table view */
  margin-bottom: 2rem;
  background-color: #1a1a1a !important; /* Table background */
  border-radius: 0.75rem;
  overflow: hidden; /* Ensures rounded corners */
  border: 1px solid #4B5563; /* Table border */
}

.custom-table {
  background-color: transparent !important;
  width: 100%;
}

.custom-table th {
  background-color: #2D2D2D !important; /* Darker header for table */
  color: white !important;
  font-weight: bold !important;
  font-size: 1rem !important;
  padding: 1rem !important;
  border-bottom: 1px solid #4B5563 !important;
}

.custom-table td {
  color: #E5E7EB !important; /* Table cell text color */
  padding: 0.8rem 1rem !important;
  border-bottom: 1px solid #2D2D2D !important; /* Subtle row separator */
}

.custom-table tbody tr:hover {
  background-color: rgba(139, 92, 246, 0.05) !important; /* Light hover effect */
}

/* Dialog Styles */
.custom-dialog .dialog-card {
  background-color: #1a1a1a !important;
  color: white !important;
  border-radius: 1rem !important;
  padding: 1rem;
  border: 1px solid #4B5563;
}

.custom-dialog .dialog-title {
  color: white !important;
  font-size: 1.6rem !important;
  font-weight: bold !important;
  padding-bottom: 1rem;
  border-bottom: 1px solid #4B5563;
  margin-bottom: 1rem;
  display: flex; /* Enable flexbox for title and close button alignment */
  align-items: center;
}

.custom-dialog .dialog-content p {
  color: #D1D5DB;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-align: left; /* Ensure dialog content is left-aligned */
}
.custom-dialog .dialog-content p strong {
  color: white;
}

.generated-image-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  background-color: #2D2D2D;
  padding: 1rem;
  border-radius: 0.75rem;
}

.responsive-image {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
</style>
