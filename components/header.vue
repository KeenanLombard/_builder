<!-- @format -->

<template>
  <div class="flex flex-col">
    <p class="text-gray-800 font-semibold">{{ props.title }}</p>
    <p class="text-gray-800 text-sm">{{ props.subtitle }}</p>
  </div>
</template>

<script setup>
const props = defineProps(["title", "subtitle"]);
</script>

<style lang="scss" scoped></style>
