<!-- @format -->

<template>
  <div>
    {{ email }}
  </div>
</template>

<script setup>
const user = useDirectusUser();
const email = user.value.email;
</script>

<style lang="scss" scoped></style>
