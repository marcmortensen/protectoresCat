<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div>Slug page with param {{ route.params.id }}</div>
</template>
