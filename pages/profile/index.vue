<!-- @format -->

<template>
  <div>
    <Header title="Profile" subtitle="Get insights into your data" />
    <pre>{{ email }}</pre>
  </div>
</template>

<script setup>
const user = useDirectusUser();

onMounted(() => {
  console.log(user.value)
});
</script>
