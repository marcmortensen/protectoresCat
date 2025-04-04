<script setup lang="ts">
import cat1 from "~/assets/icons/animals/cat1.svg?inline";
import cat2 from "~/assets/icons/animals/cat2.svg?inline";
import cat3 from "~/assets/icons/animals/cat3.svg?inline";
import cat4 from "~/assets/icons/animals/cat4.svg?inline";
import cat5 from "~/assets/icons/animals/cat5.svg?inline";
import cat6 from "~/assets/icons/animals/cat6.svg?inline";
import dog1 from "~/assets/icons/animals/dog1.svg?inline";
import dog2 from "~/assets/icons/animals/dog2.svg?inline";
import dog3 from "~/assets/icons/animals/dog3.svg?inline";
import dog4 from "~/assets/icons/animals/dog4.svg?inline";
import dog5 from "~/assets/icons/animals/dog5.svg?inline";
import dog6 from "~/assets/icons/animals/dog6.svg?inline";

const catPlaceholderImages = [cat1, cat2, cat3, cat4, cat5, cat6];
const dogPlaceholderImages = [dog1, dog2, dog3, dog4, dog5, dog6];

const route = useRoute();

const typeOfAnimal = [
  { label: "Cats", value: "cats" },
  { label: "Dogs", value: "dogs" },
];

const QueryParam = {
  REGIONS: "regions",
  ANIMAL_TYPES: "focus",
  PAGE: "page",
};

const queryTransform = {
  get: (value: string | undefined) => value?.split(",") || [],
  set: (value: string[]) => (value.length === 0 ? undefined : value.join(",")),
};

const regions = useRouteQuery(QueryParam.REGIONS, undefined, {
  mode: "push",
  transform: queryTransform,
});
const animalType = useRouteQuery(QueryParam.ANIMAL_TYPES, undefined, {
  mode: "push",
  transform: queryTransform,
});

const page = useRouteQuery(QueryParam.PAGE, "1", {
  mode: "push",
  transform: { get: Number, set: String },
});

const ITEMS_PER_PAGE = 9;

const { data, refresh, clear } = await useAsyncData(
  route.path,
  async () => {
    const randomPlaceholderImage = Math.floor(
      Math.random() * catPlaceholderImages.length
    );
    const randomPlaceholderImageMultiple = Math.floor(
      Math.random() * catPlaceholderImages.length + dogPlaceholderImages.length
    );
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
    const orgsCount = await query.count();
    const orgs = await query
      .limit(ITEMS_PER_PAGE)
      .order("shortName", "ASC")
      .skip((page.value - 1) * ITEMS_PER_PAGE)
      .all();

    return {
      orgsCount,
      orgs,
      regions: dataRegions,
      randomPlaceholderImage,
      randomPlaceholderImageMultiple,
    };
  },
  { immediate: true, watch: [regions, animalType, page] }
);

const filters = computed(() => {
  return [
    ...regions.value.map((regionSlug) => {
      const region = data.value?.regions.find((r) => r.slug === regionSlug);
      return {
        label: region?.name || "",
        remove: () =>
          (regions.value = regions.value.filter(
            (region) => region !== regionSlug
          )),
      };
    }),
    ...animalType.value.map((animalTypeSlug) => {
      const animal = typeOfAnimal.find(
        (animal) => animal.value === animalTypeSlug
      );
      return {
        label: animal?.label || "",
        remove: () =>
          (animalType.value = animalType.value.filter(
            (animal) => animal !== animalTypeSlug
          )),
      };
    }),
  ];
});
const resetPage = () => {
  page.value = 1;
};

watch(
  [regions, animalType],
  () => {
    resetPage();
  },
  {
    flush: "sync",
  }
);

const entryCardsTop = ref<HTMLDivElement>();
const scrollOffset = 50;
const entryCardsTopIsVisible = useElementVisibility(entryCardsTop, {
  rootMargin: () => `-${scrollOffset}px 0px 0px 0px`,
});

const scrollToTop = () => {
  if (entryCardsTop.value && !entryCardsTopIsVisible.value) {
    entryCardsTop.value.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const cleanQueryParams = async () => {
  const validRegions = data.value?.regions.map((region) => region.slug) || [];
  const validAnimalTypes = typeOfAnimal.map((animal) => animal.value);

  const cleanedRegions = regions.value.filter((region) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validRegions.includes(region as any)
  );
  const cleanedAnimalTypes = animalType.value.filter((type) =>
    validAnimalTypes.includes(type)
  );

  let refreshRequired = false;
  if (cleanedRegions.length !== regions.value.length) {
    refreshRequired = true;
    regions.value = cleanedRegions.length > 0 ? cleanedRegions : [];
  }
  if (cleanedAnimalTypes.length !== animalType.value.length) {
    refreshRequired = true;
    animalType.value = cleanedAnimalTypes;
  }
  if (refreshRequired) {
    clear();
    refresh();
  }
};

onMounted(() => {
  cleanQueryParams();
});

function stringToNumber(str: string, limit: number): number {
  return [...str].reduce((acc, char) => acc + char.charCodeAt(0), 0) % limit;
}
</script>

<template>
  <div
    v-if="data"
    class="flex flex-col w-1/2 justify-center items-center mx-auto mt-4"
  >
    <div>
      <USelectMenu
        v-model="regions as typeof data.regions"
        class="w-52"
        multiple
        :items="data.regions"
        value-key="slug"
        label-key="name"
        placeholder="Select a region"
        color="primary"
      />
      <USelectMenu
        v-model="animalType"
        class="w-52"
        multiple
        :items="typeOfAnimal"
        value-key="value"
        label-key="label"
        :search-input="false"
        placeholder="Select animal type"
      />
    </div>
    <UIcon name="i-lucide-lightbulb" class="size-5" />
    <h1 class="text-4xl font-semibold">Organizations</h1>
    <p class="text-lg text-gray-500">
      Here are some organizations that you can support
    </p>

    <div
      ref="entryCardsTop"
      :style="{ scrollMarginTop: `${scrollOffset + 16}px` }"
    />
    <div class="flex gap-2">
      <template v-for="(filter, index) in filters" :key="index">
        <UBadge
          v-if="filter.label"
          color="neutral"
          trailing-icon="i-lucide-x"
          variant="outline"
          :label="filter.label"
          @click="filter.remove()"
        />
      </template>
    </div>

    <div v-if="data?.orgs" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <NuxtLink
        v-for="org in data.orgs"
        :key="org.id"
        :to="{ name: 'organizations-slug', params: { slug: org.slug } }"
        class="bg-white p-4 shadow rounded group relative"
      >
        <div class="flex gap-2 flex-col h-full">
          <div class="flex justify-center">
            <NuxtImg
              v-if="org.logo"
              :src="org.logo"
              alt="logo"
              class="h-30"
              placeholder
              @error="console.log('loading image', org.logo)"
            />

            <img
              v-else
              :src="
                org.animalFocus === 'cats' || animalType.includes('cats')
                  ? catPlaceholderImages[stringToNumber(org.slug, 6)]
                  : org.animalFocus === 'dogs' || animalType.includes('dogs')
                    ? dogPlaceholderImages[stringToNumber(org.slug, 6)]
                    : [...catPlaceholderImages, ...dogPlaceholderImages][
                        stringToNumber(org.slug, 12)
                      ]
              "
              alt="logo"
              class="h-30"
            />
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
          <span>{{ `${org.municipality}` }}</span>
        </div>
      </NuxtLink>
    </div>
    <UPagination
      v-model:page="page"
      :items-per-page="ITEMS_PER_PAGE"
      :total="data.orgsCount"
      :default-page="1"
      color="primary"
      @update:page="scrollToTop"
    />
  </div>
</template>
