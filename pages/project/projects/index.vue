<!-- @format -->

<template>
  <div>
    <div v-if="!isLoading">
      <Header title="Projects" subtitle="Manage your projects" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(project, index) in projects" :key="index">
          <ProjectCard :project="project" />
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { getItems } = useDirectusItems();

const projects = ref(null);
const isLoading = ref(true);

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
</script>
