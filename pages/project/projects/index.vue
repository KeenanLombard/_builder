<!-- @format -->

<template>
  <div>
    <div v-if="!isLoading">
      <Header title="Projects" subtitle="Manage your projects">
        <!-- <button
          @click="$router.push('/project/new-project')"
          class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
          + New Project
        </button> -->
      </Header>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          @click="$router.push('/project/new-project')"
          class="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 hover:border-indigo-500 hover:bg-gray-100 transition duration-300 cursor-pointer h-full">
          <div class="rounded-full bg-indigo-100 p-3">
            <i class="fas fa-plus text-indigo-600 text-lg"></i>
          </div>
          <p class="mt-2 text-sm font-medium text-gray-900">
            Create New Project
          </p>
          <p class="text-xs text-gray-500 text-center mt-1">
            Click to add a new project to your portfolio
          </p>
        </div>
        <div v-for="project in projects" :key="project.id">
          <ProjectCard
            type="project"
            @delete="handleDeleteEmit(project.id)"
            @convert="handleConvertEmit(project)"
            :project="project" />
        </div>
      </div>

      <Modal :show="convertModal" @close="convertModal = false">
        <template #header>
          <h3 class="text-xl font-semibold text-center mb-2">
            Convert Project To Template
          </h3>
        </template>
        <p class="text-center text-gray-600 mb-4">
          This project will be converted to a temnplate. You will be able to
          start a new project from this template.
        </p>

        <template #footer>
          <div class="flex justify-between mt-4 space-x-2">
            <button
              @click="convertModal = false"
              class="w-full px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
              Cancel
            </button>
            <button
              @click="convertProject"
              class="w-full px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
              Confirm
            </button>
          </div>
        </template>
      </Modal>

      <Modal :show="modal" @close="modal = false">
        <template #header>
          <h3 class="text-xl font-semibold text-center mb-2">Delete Project</h3>
        </template>
        <p class="text-center text-gray-600 mb-4">
          Are you sure you want to delete this project? If you do it's gone
          forever. This action cannot be undone.
        </p>

        <template #footer>
          <div class="flex justify-between mt-4 space-x-2">
            <button
              @click="modal = false"
              class="w-full px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
              Cancel
            </button>
            <button
              @click="deleteProject"
              class="w-full px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600">
              Confirm
            </button>
          </div>
        </template>
      </Modal>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { getItems } = useDirectusItems();
const { deleteItems } = useDirectusItems();
const { createItems } = useDirectusItems();

const projects = ref(null);
const isLoading = ref(true);
const modal = ref(false);
const convertModal = ref(false);

const selectedProject = ref(null);

const handleDeleteEmit = (id) => {
  modal.value = true;
  selectedProject.value = id;
};

const handleConvertEmit = (project) => {
  convertModal.value = true;
  selectedProject.value = project;
};

const convertProject = async () => {
  try {
    const items = [
      {
        name: selectedProject.value.name,
        description: selectedProject.value.description,
        template_code: selectedProject.value.project_code,
        status: "draft",
        date_created: new Date(),
        date_updated: new Date(),
        cover_image: selectedProject.value.cover_image,
      },
    ];
    await createItems({ collection: "templates", items });
    convertModal.value = false;
    selectedProject.value = null;
  } catch (e) {}
};

const deleteProject = async () => {
  try {
    const items = [selectedProject.value];
    await deleteItems({ collection: "projects", items });
    if (Array.isArray(projects.value)) {
      projects.value = projects.value.filter(
        (project) => project.id !== selectedProject.value
      );
    }
    modal.value = false;
    selectedProject.value = null;
  } catch (e) {}
};

const fetchProjects = async () => {
  try {
    const items = await getItems({
      collection: "projects",
      params: {},
    });
    return items;
  } catch (e) {
    console.error("Failed to fetch articles:", e);
    return null;
  } finally {
    isLoading.value = false;
  }
};

onBeforeMount(async () => {
  projects.value = await fetchProjects();
});

watch(modal, (newVal) => {
  if (newVal === false) {
    selectedProject.value = null;
    console.log(selectedProject.value);
  }
});
</script>
