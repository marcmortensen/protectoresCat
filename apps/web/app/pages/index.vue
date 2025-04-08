<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import type { AccordionItem } from "@nuxt/ui";
const selectedRegionId = ref<string | undefined>();
const hoveredRegionId = ref<string | null>();
const isSlideoverOpen = ref(false);

const allRegionItems = computed<AccordionItem[]>(() =>
  (data.value?.regions || []).map((region) => ({
    label: region.name,
    disabled: !data.value?.orgsByRegions.find((r) => r.region === region.slug),
    slug: region.slug,
  }))
);
const route = useRoute();

const { data } = await useAsyncData(
  route.path,
  async () => {
    const orgsByRegions = await queryCollection("organizationByRegion").all();
    const regions = await queryCollection("regions").all();

    return {
      orgsByRegions,
      regions,
    };
  },
  { immediate: true }
);

const regions = computed(() => {
  return data.value?.orgsByRegions.map((region) => ({
    id: region.region as string,
    cats: region.cats,
    dogs: region.dogs,
    slug: region.region as string,
    name: data.value?.regions.find((r) => r.slug === region.region)?.name || "",
  }));
});

const currentRegion = computed(() => {
  return regions.value?.find((region) => region.id === hoveredRegionId.value);
});

const regionRouteBuilder = (regionSlug: string): RouteLocationRaw => {
  return {
    name: "organizations",
    query: {
      regions: regionSlug,
    },
  };
};

definePageMeta({});
</script>

<template>
  <div class="bg-white shadow-lg w-full h-full overflow-hidden">
    <div v-if="data" class="flex flex-col xl:flex-row w-full h-screen">
      <section
        class="h-96 xl:h-auto w-full xl:w-1/2 border-gray-dark border-t border-b xl:border-t-0 bg-gray-light"
      >
        <div class="flex flex-row h-full">
          Type
          <div
            class="flex-grow h-full overflow-y-hidden overflow-x-auto xl:overflow-x-hidden xl:bg-black bg-contain bg-center bg-no-repeat"
          >
            <div class="h-full">
              <ul class="h-full flex items-center max-w-512 mx-auto">
                <li
                  v-for="(type, index) in ['cats', 'dogs']"
                  :key="index"
                  class="xl:w-1/3 px-4 text-center first:ml-auto last:mr-auto"
                >
                  <NuxtLink
                    class="mx-auto text-9xl xl:text-[250px] text-primary hover:text-gray-500"
                    :to="{ name: 'organizations', query: { focus: type } }"
                  >
                    <SvgoAnimalsCat1 v-if="type === 'cats'" alt="logo" />
                    <SvgoAnimalsDog5 v-else alt="logo" />
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        class="h-96 xl:h-auto w-full xl:w-1/2 bg-amber-200 border-gray-dark border-b"
      >
        <div class="flex xl:flex-row-reverse h-full">
          <div
            class="bg-amber-600 h-full border-gray-dark relative w-16 xl:w-24 flex-shrink-0"
          >
            <div
              class="absolute w-0 h-0 top-1/2 left-1/2 flex items-center justify-center"
            >
              <p
                class="uppercase transform text-gray-dark text-30 tracking-500 rotate-90"
              >
                Regions
              </p>
            </div>
          </div>
          <div class="flex-grow h-full relative">
            <RegionsMap
              v-if="regions"
              v-model="selectedRegionId"
              :regions="regions"
              class="hidden lg:block transition-all duration-500 ease-in-out w-full h-full"
              :route-builder="regionRouteBuilder"
              @hover="hoveredRegionId = $event"
            />

            <RegionsMap
              v-if="regions"
              :regions="regions"
              class="block lg:hidden transition-all duration-500 ease-in-out w-full h-full"
              read-only
              @click="isSlideoverOpen = true"
            />

            <USlideover
              v-if="isSlideoverOpen"
              v-model:open="isSlideoverOpen"
              title="Regions"
            >
              <template #body>
                <UAccordion :items="allRegionItems" :multiple="false">
                  <template #body="{ item }">
                    See all the organizations from
                    <UButton
                      class="-ml-2"
                      variant="link"
                      :to="regionRouteBuilder(item.slug)"
                      :label="`${item.label}`"
                    /> </template
                ></UAccordion>
              </template>
            </USlideover>

            <div
              v-if="currentRegion"
              class="text-right absolute right-0 bottom-0 p-4 w-full flex flex-col items-end pointer-events-none"
            >
              <div class="text-7xl uppercase tracking-150 text-gray-dark">
                {{ currentRegion.name }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="bg-green-800 w-full">
      <p>adasdasd</p>
    </div>
  </div>
</template>
