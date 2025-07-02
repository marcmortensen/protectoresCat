<script setup lang="ts">
const route = useRoute();

const typeOfAnimal = [
  { label: "Gats", value: "cats" },
  { label: "Gossos", value: "dogs" },
];

const QueryParam = {
  REGIONS: "regions",
  ANIMAL_TYPES: "focus",
  PAGE: "page",
  SEARCH: "search",
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

const search = useRouteQuery(QueryParam.SEARCH, "", {
  transform: { get: String, set: String },
});

const resetFilters = () => {
  regions.value = [];
  animalType.value = [];
};

watch(
  search,
  () => {
    resetPage();
  },
  {
    flush: "sync",
  }
);

const page = useRouteQuery(QueryParam.PAGE, "1", {
  mode: "push",
  transform: { get: Number, set: String },
});

const ITEMS_PER_PAGE = 12;

const { data, refresh, clear } = await useAsyncData(
  route.path,
  async () => {
    const dataRegions = await queryCollection("regions").all();
    const query = queryCollection("organizations");

    if (search.value) {
      query.orWhere((query) => {
        query
          .where("name", "LIKE", `%${search.value}%`)
          .where("municipality", "LIKE", `%${search.value}%`)
          .where("shortName", "LIKE", `%${search.value}%`);
        return query;
      });
    }
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
    };
  },
  { immediate: true, watch: [regions, animalType, page, search], deep: true }
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
  [regions, animalType, search],
  () => {
    resetPage();
  },
  {
    flush: "sync",
  }
);

const entryCardsTop = ref<HTMLDivElement>();
const scrollOffset = 80;
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

const getConnectedToRegions = computed(() =>
  regions.value && regions.value.length === 1
    ? data.value?.regions.find((region) => region.slug === regions.value[0])
        ?.connectedTo
    : []
);

useSeoMeta({
  ogTitle: "Llistat d'entitats d'adopció d'animals a Catalunya",
  title: "Llistat d'entitats d'adopció d'animals a Catalunya",
  description:
    "Descobreix totes les entitats que permeten adopcions filtra per tipus o per comarques.",
  ogDescription:
    "Descobreix totes les entitats que permeten adopcions filtra per tipus o per comarques.",
  twitterCard: "summary_large_image",
  twitterTitle: "Llistat d'entitats d'adopció d'animals a Catalunya",
  twitterDescription:
    "Descobreix totes les entitats que permeten adopcions filtra per tipus o per comarques.",
  ogImage: "https://adoptar.cat/logo_w1200_h630.png",
  ogImageUrl: "https://adoptar.cat/logo_w1200_h630.png",
  twitterImage: "https://adoptar.cat/logo_w1200_h630.png",
});
</script>

<template>
  <div
    v-if="data"
    class="lg:px-32 py-4 3xl:w-3/4 flex flex-col w-full px-1 justify-center items-center mx-auto gap-4 last:pb-4"
  >
    <div class="w-full flex flex-col xl:flex-row gap-4 px-4">
      <!-- Filters Sidebar (Comarques & Animals) -->
      <div class="w-full xl:w-80 flex flex-col lg:flex-row xl:flex-col gap-4">
        <div class="flex flex-col sm:flex-row xl:flex-col gap-4 w-full">
          <div class="w-full sm:w-1/2 xl:w-full">
            <label
              class="text-sm font-semibold text-gray-900 dark:text-white mb-1 block"
              >Comarques:</label
            >
            <USelectMenu
              v-model="regions as typeof data.regions"
              class="w-full"
              multiple
              :items="data.regions"
              value-key="slug"
              label-key="name"
              placeholder="Escull una comarca"
              color="primary"
            />
          </div>
          <div class="w-full sm:w-1/2 xl:w-full">
            <label
              class="text-sm font-semibold text-gray-900 dark:text-white mb-1 block"
              >Animals:</label
            >
            <USelectMenu
              v-model="animalType"
              class="w-full"
              multiple
              :items="typeOfAnimal"
              value-key="value"
              label-key="label"
              :search-input="false"
              placeholder="Escull el tipus d'animal"
            />
          </div>
        </div>
      </div>
      <!-- Results + Search -->
      <div class="flex-1 flex flex-col gap-4">
        <!-- Search on top of results (right side on desktop) -->
        <div class="w-full mb-2">
          <label
            class="text-sm font-semibold text-gray-900 dark:text-white mb-1 block xl:hidden"
            >Cerca:</label
          >
          <UInput
            v-model="search"
            placeholder="Cerca per nom o municipi"
            class="w-full xl:mt-6"
            icon="i-lucide-search"
          />
        </div>
        <!-- Results summary and clear filters -->
        <div
          ref="entryCardsTop"
          :style="{ scrollMarginTop: `${scrollOffset - 50}px` }"
          class="flex items-center justify-between w-full h-5"
        >
          <div v-if="filters.length > 0 || search" class="h-5">
            {{
              data.orgsCount === 0
                ? "Sense resultats"
                : data.orgsCount === 1
                  ? `1 resultat`
                  : `${data.orgsCount} resultats`
            }}
          </div>
          <div v-if="filters.length > 0 || search">
            <UButton
              class="h-5"
              color="primary"
              variant="ghost"
              label="Netejar filtres"
              @click="
                () => {
                  search = '';
                  resetFilters();
                }
              "
            />
          </div>
        </div>
        <!-- Filter badges -->
        <div
          class="flex justify-start items-center gap-4 md:gap-2 w-full flex-wrap"
        >
          <template v-for="(filter, index) in filters" :key="index">
            <UBadge
              v-if="filter.label"
              color="neutral"
              class="cursor-pointer hover:text-primary"
              trailing-icon="i-lucide-x"
              variant="outline"
              :label="filter.label"
              @click="filter.remove()"
            />
          </template>
        </div>
        <!-- Connected regions alert -->
        <div
          v-if="regions.length === 1 && getConnectedToRegions"
          class="w-full"
        >
          <UAlert color="neutral" variant="outline">
            <template #description>
              <div>
                <span>
                  Pots trobar més resultats afegint les comarques adjacents fent
                  clic
                </span>
                <UButton
                  class="!p-0 !m-0 !text-sm"
                  color="primary"
                  variant="link"
                  :to="{
                    name: 'organizations',
                    query: {
                      ...route.query,
                      regions: [
                        route.query.regions as string,
                        ...(getConnectedToRegions as string[]),
                      ].join(','),
                    },
                  }"
                  label="aquí."
                />
              </div>
            </template>
          </UAlert>
        </div>
        <!-- Results grid -->
        <div
          v-if="data?.orgs"
          class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2 gap-4 w-full"
        >
          <NuxtLink
            v-for="org in data.orgs"
            :key="org.id"
            :to="{ name: 'organizations-slug', params: { slug: org.slug } }"
            class="group relative"
          >
            <div
              class="overflow-hidden rounded-xl bg-white dark:bg-gray-700 shadow-md w-full transform transition-transform duration-500 group-hover:rotate-y-12 group-hover:scale-105"
            >
              <div class="md:flex w-full h-full items-center justify-center">
                <div
                  class="md:shrink-0 h-48 w-full md:w-48 sm:h-full flex items-center justify-center"
                >
                  <NuxtPicture
                    v-if="org.logo && org.enabledLogoUsage"
                    format="avif,webp"
                    :src="org.logo"
                    :alt="`Logo of ${org.name}`"
                    :img-attrs="{
                      class: 'h-48 sm:w-full md:h-full md:w-48 max-h-48',
                    }"
                    @error="org.logo = undefined"
                  />
                  <template v-else>
                    <SvgoAnimalsCat1
                      v-if="
                        org.animalFocus === 'cats&dogs' ||
                        org.animalFocus === 'cats'
                      "
                      :font-controlled="false"
                      class="h-48"
                    />
                    <SvgoAnimalsDog5
                      v-if="
                        org.animalFocus === 'cats&dogs' ||
                        org.animalFocus === 'dogs'
                      "
                      :font-controlled="false"
                      class="h-48"
                    />
                  </template>
                </div>
                <div class="pt-2 p-8 md:pt-8 text-black dark:text-white">
                  <div
                    class="text-lg leading-tight line-clamp-1 font-medium group-hover:text-primary"
                  >
                    {{ org.shortName }}
                  </div>
                  <div
                    class="mt-1 text-sm font-semibold tracking-wide line-clamp-1"
                  >
                    {{ org.municipality }}
                  </div>
                  <p
                    class="mt-2 text-gray-500 dark:text-gray-100 line-clamp-4 min-h-24 text-pretty"
                  >
                    {{ org.description }}
                  </p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div class="w-full flex justify-center">
          <UPagination
            v-if="
              data && data.orgsCount !== 0 && data.orgsCount > ITEMS_PER_PAGE
            "
            v-model:page="page"
            :items-per-page="ITEMS_PER_PAGE"
            :total="data.orgsCount"
            :default-page="1"
            color="primary"
            @update:page="scrollToTop"
          />
        </div>
      </div>
    </div>
  </div>
</template>
