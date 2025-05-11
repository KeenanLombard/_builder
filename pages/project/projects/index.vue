<!-- @format -->

<template>
  <Header title="Projects" subtitle="View all your projects" />
  <div v-if="projects">
    <div v-for="(project, index) in projects" :key="index">
      <div
        class="flex justify-between items-center m-5 p-5 bg-indigo-100 rounded-lg">
        <div>
          <p>ID: {{ project.id }}</p>
          <p>NAME: {{ project.name }}</p>
          <p>DESC: {{ project.description }}</p>
          <p>STATUS: {{ project.status }}</p>
          <p>DC: {{ project.date_created }}</p>
          <p>DU: {{ project.date_updated }}</p>
          <p>UC: {{ project.user_created }}</p>
          <p>UU: {{ project.user_updated }}</p>
        </div>
        <div>
          <button class="bg-red-400 p-1 rounded text-white font-semibold">
            DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { getItems } = useDirectusItems();

const projects = ref(null);

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
  }
};

onMounted(async () => {
  projects.value = await fetchProjects();
});
</script>
