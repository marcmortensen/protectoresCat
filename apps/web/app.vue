<script setup lang="ts">
const route = useRoute();
const { data: orgs } = await useAsyncData(route.path, () => {
  return queryCollection("organizations").all();
});
</script>

<template>
  <div>
    <div class="p-6 bg-purple-800">tinc nyonya guapo</div>
  </div>

  <div class="flex flex-col w-1/2 justify-center items-center mx-auto">
    <h1 class="text-4xl font-semibold">Organizations</h1>
    <p class="text-lg text-gray-500">
      Here are some organizations that you can support
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        v-for="org in orgs"
        :key="org.id"
        class="bg-white p-4 shadow rounded group relative"
      >
        <div class="flex gap-2 flex-col h-full">
          <div class="flex justify-center">
            <img
              v-if="org.logo"
              :src="org.logo"
              alt="logo"
              class="h-30"
              @error="console.log('loading image', org.logo)"
            />
            <div v-else class="h-30 bg-amber-950 w-full" />
          </div>
          <div>
            <div class="flex justify-between items-center">
              <h1 class="font-semibold">{{ org.shortName }}</h1>
              <span v-if="org.animalFocus === 'cats&dogs'">🐱🐶</span>
              <span v-if="org.animalFocus === 'cats'">🐱</span>
              <span v-if="org.animalFocus === 'dogs'">🐶</span>
            </div>
            <p class="line-clamp-4 min-h-24">
              {{ org.description }}
            </p>
          </div>
          <a
            v-if="org.website"
            class="bg-amber-500"
            :href="org.website"
            target="_blank"
            >View</a
          >
          <div v-else class="h-6" />
          <span>{{ `${org.municipality}` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
