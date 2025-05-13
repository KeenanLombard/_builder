<!-- @format -->

<template>
  <div>
    <Header title="Profile" subtitle="Get insights into your data" />
    <pre>{{ email }}</pre>
  </div>
</template>

<script setup>
const user = useDirectusUser();
const email = ref(null);

onMounted(async () => {
  email.value = user;
});
</script>
