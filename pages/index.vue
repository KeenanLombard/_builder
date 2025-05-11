<!-- @format -->

<template>
  <div v-if="projectCode">
    <Builder :project_data="projectCode" />
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { getItems } = useDirectusItems();

const projectCode = ref(null);

const fetchArticles = async () => {
  try {
    const items = await getItems({
      collection: "projects",
      params: {},
    });
    console.log(items[0].project_code);
    return items[0].project_code;
  } catch (e) {
    console.error("Failed to fetch articles:", e);
    return null;
  }
};

onMounted(async () => {
  projectCode.value = await fetchArticles();
});
</script>
