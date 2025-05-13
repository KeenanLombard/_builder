<!-- @format -->

<template>
  <div class="flex flex-col space-y-1 pb-2 border-b border-gray-200 mb-6">
    <h2 class="text-lg md:text-xl font-semibold text-gray-900 leading-tight">
      {{ props.title }}
    </h2>
    <p class="text-sm text-gray-600 font-medium">{{ props.subtitle }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
