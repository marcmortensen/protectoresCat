<script setup lang="ts">
const route = useRoute();

const typeOfAnimal = ["cats", "dogs"];

const queryTransform = {
  get: (value: string | undefined) => value?.split(",") || [],
  set: (value: string[]) => (value.length === 0 ? undefined : value.join(",")),
};

const regions = useRouteQuery("regions", undefined, {
  transform: queryTransform,
});
const animalType = useRouteQuery("animalType", undefined, {
  transform: queryTransform,
});

const page = useRouteQuery("page", "1", {
  mode: "push",
  transform: { get: Number, set: String },
});

const { data } = await useAsyncData(
  route.path,
  async () => {
    const dataRegions = await queryCollection("regions").all();
    const query = queryCollection("organizations");

    if (regions.value.length > 0) {
      query.orWhere((query) => {
        regions.value.forEach((slug) => {
          query.where("region", "LIKE", `%${slug}%`);
        });
        return query;
      });
    }

    if (animalType.value.length > 0) {
      query.orWhere((query) => {
        animalType.value.forEach((slug) => {
          query.where("animalFocus", "LIKE", `%${slug}%`);
        });
        return query.where("animalFocus", "LIKE", `%cats&dogs%`);
      });
    }

    const orgs = await query.limit(9).all();
    return { orgs, regions: dataRegions };
  },
  { immediate: true, watch: [regions, animalType, page] }
);
</script>

<template>
  <div
    v-if="data"
    class="flex flex-col w-1/2 justify-center items-center mx-auto mt-4"
  >
    <div>
      <USelectMenu
        v-model="regions"
        multiple
        :items="data.regions"
        value-key="slug"
        label-key="name"
        placeholder="Select a region"
      />
      <USelectMenu
        v-model="animalType"
        multiple
        :items="typeOfAnimal"
        :search-input="false"
        placeholder="Select animal type"
      />
    </div>
    <pre>{{ data?.orgs.length }}</pre>
    <UIcon name="i-lucide-lightbulb" class="size-5" />
    <h1 class="text-4xl font-semibold">Organizations</h1>
    <p class="text-lg text-gray-500">
      Here are some organizations that you can support
    </p>

    <div v-if="data?.orgs" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        v-for="org in data.orgs"
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
