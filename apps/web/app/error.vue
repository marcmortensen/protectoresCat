<script setup lang="ts"></script>
<template>
  <UApp>
    <NuxtLayout>
      <div class="text-4xl">Error!</div>
      <UButton
        class="mt-4"
        variant="outline"
        label="Go to Home"
        @click="$router.push('/')"
      />
    </NuxtLayout>
  </UApp>
</template>
