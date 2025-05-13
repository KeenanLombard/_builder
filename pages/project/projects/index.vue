<!-- @format -->

<template>
  <div>
    <div v-if="!isLoading">
      <Header title="Projects" subtitle="Manage your projects" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(project, index) in projects" :key="index">
          <ProjectCard
            @delete="handleDeleteEmit(project.id)"
            :project="project" />
        </div>
      </div>
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

const projects = ref(null);
const isLoading = ref(true);
const modal = ref(false);

const selectedProject = ref(null);

const handleDeleteEmit = (id) => {
  modal.value = true;
  selectedProject.value = id;
};

const deleteProject = async () => {
  try {
    const items = [selectedProject.value];
    await deleteItems({ collection: "projects", items });
    projects.value = projects.value.filter(
      (project) => project.id !== selectedProject.value
    );
    modal.value = false;
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
