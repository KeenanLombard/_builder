<!-- @format -->

<template>
  <div>
    <div v-if="!isLoading">
      <Header :title="project.name" :subtitle="project.date_created" />
      <Builder :project_data="project.project_code" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { getItemById } = useDirectusItems();
const route = useRoute();

const project = ref(null);
const isLoading = ref(true);

const fetchProject = async () => {
  try {
    const item = await getItemById({
      collection: "projects",
      id: route.params.id,
    });
    return item;
  } catch (e) {
    console.error("Failed to fetch articles:", e);
    return null;
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  project.value = await fetchProject();
  console.log(project.value);
});
</script>
