<script setup lang="ts">
import type { RegionsCollectionItem } from "@nuxt/content";
import {
  buildOrganizationsListQuery,
  filterOrganizations,
  paginateOrganizations,
  type OrganizationSortType,
} from "~/utils/organizationListFilters";
import { buildSuggestOrganizationQuery } from "~/utils/suggestOrganizationQuery";

const route = useRoute();
const { trackEvent } = useGtag();

const typeOfAnimal = [
  { label: "Gats", value: "cats" },
  { label: "Gossos", value: "dogs" },
];

const QueryParam = {
  REGIONS: "regions",
  ANIMAL_TYPES: "focus",
  PAGE: "page",
  SEARCH: "search",
  SORT: "sort",
};

const queryTransform = {
  get: (value: string | undefined) => value?.split(",") || [],
  set: (value: string[]) => (value.length === 0 ? undefined : value.join(",")),
};

const regions = useRouteQuery(QueryParam.REGIONS, undefined, {
  mode: "push",
  transform: {
    get: (value: string | undefined) =>
      (value?.split(",") as RegionsCollectionItem["slug"][]) || [],
    set: (value: RegionsCollectionItem["slug"][]) =>
      value.length === 0 ? undefined : value.join(","),
  },
});

const animalType = useRouteQuery(QueryParam.ANIMAL_TYPES, undefined, {
  mode: "push",
  transform: queryTransform,
});

const search = useRouteQuery(QueryParam.SEARCH, "", {
  transform: { get: String, set: String },
});

const searchInput = ref(search.value);

watchDebounced(
  searchInput,
  (value) => {
    search.value = value;
  },
  { debounce: 300 }
);

watch(search, (value) => {
  if (searchInput.value !== value) {
    searchInput.value = value;
  }
});

type SortType = OrganizationSortType;
const sortOptions: { label: string; value: SortType }[] = [
  { label: "Última actualització", value: "last-revised" },
  { label: "Nom (A-Z)", value: "title" },
  { label: "Nom (Z-A)", value: "-title" },
];

const DEFAULT_SORT: SortType = "last-revised";
const sort = useRouteQuery<SortType>(QueryParam.SORT, DEFAULT_SORT, {
  mode: "push",
  transform: {
    get: (value: string | undefined) => value as SortType,
    set: (value: SortType) => value,
  },
});

const resetFilters = () => {
  regions.value = [];
  animalType.value = [];
};

const organizationsRoute = (
  overrides: {
    regions?: RegionsCollectionItem["slug"][];
    animalTypes?: string[];
    search?: string;
    sort?: SortType;
    page?: number;
  } = {}
) => ({
  path: "/organizations" as const,
  query: buildOrganizationsListQuery(
    {
      regions: overrides.regions ?? regions.value,
      animalTypes: overrides.animalTypes ?? animalType.value,
      search: overrides.search ?? search.value,
      sort: overrides.sort ?? sort.value,
      page: overrides.page ?? page.value,
    },
    { sort: DEFAULT_SORT }
  ),
});

const page = useRouteQuery(QueryParam.PAGE, "1", {
  mode: "push",
  transform: { get: Number, set: String },
});

const isRouteOrganizations = computed(() => route.name === "organizations");
const isRouteLeaving = ref(false);

onBeforeRouteLeave(() => {
  isRouteLeaving.value = true;
});

const canModifyRoute = () =>
  isRouteOrganizations.value && !isRouteLeaving.value;

const resetPage = () => {
  if (!canModifyRoute()) return;
  page.value = 1;
};

watch(
  [search, sort],
  () => {
    resetPage();
  },
  {
    flush: "sync",
  }
);

const ITEMS_PER_PAGE = 12;

const paginationTo = (pageNumber: number) =>
  organizationsRoute({ page: pageNumber });

const { data: regionCatalog } = useRegions();

const { locating: locatingComarca, getRegionSlug } = useGeolocation();

async function onClickMyLocationRegion() {
  trackEvent("click_button_my_location", {
    event_category: "engagement",
    event_label: "My location region button clicked",
  });

  const slug = await getRegionSlug();
  if (slug) {
    regions.value = [slug];
  }
}

const { data: allOrgs, pending } = useLazyAsyncData("organizations-all", () =>
  queryCollection("organizations").all()
);

const data = computed(() => {
  const filtered = filterOrganizations(allOrgs.value ?? [], {
    search: search.value,
    regions: regions.value,
    animalTypes: animalType.value,
    sort: sort.value,
  });
  return {
    orgsCount: filtered.length,
    orgs: paginateOrganizations(filtered, page.value, ITEMS_PER_PAGE),
  };
});

const filters = computed(() => {
  return [
    ...regions.value.map((regionSlug) => {
      const region = regionCatalog.value?.find((r) => r.slug === regionSlug);
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

watch(
  [regions, animalType, search],
  () => {
    resetPage();
  },
  {
    flush: "sync",
  }
);

watch(
  () => data.value.orgsCount,
  (count) => {
    if (!canModifyRoute()) return;
    const maxPage = Math.max(1, Math.ceil(count / ITEMS_PER_PAGE));
    if (page.value > maxPage) {
      page.value = maxPage;
    }
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

const cleanQueryParams = () => {
  if (!regionCatalog.value) {
    return;
  }
  const validRegions = regionCatalog.value.map((region) => region.slug);
  const validAnimalTypes = typeOfAnimal.map((animal) => animal.value);

  const cleanedRegions = regions.value.filter((region) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validRegions.includes(region as any)
  );
  const cleanedAnimalTypes = animalType.value.filter((type) =>
    validAnimalTypes.includes(type)
  );

  if (cleanedRegions.length !== regions.value.length) {
    regions.value = cleanedRegions.length > 0 ? cleanedRegions : [];
  }
  if (cleanedAnimalTypes.length !== animalType.value.length) {
    animalType.value = cleanedAnimalTypes;
  }
};

watch(
  allOrgs,
  () => {
    cleanQueryParams();
  },
  { flush: "post", immediate: true }
);

const getConnectedToRegions = computed(() =>
  regions.value && regions.value.length === 1
    ? regionCatalog.value?.find((region) => region.slug === regions.value[0])
        ?.connectedTo
    : []
);

const hasAdjacentRegions = computed(
  () => (getConnectedToRegions.value?.length ?? 0) > 0
);

const expandRegionsTo = computed(() => {
  const regionSlug = regions.value[0];
  if (regions.value.length !== 1 || !regionSlug || !hasAdjacentRegions.value) {
    return undefined;
  }

  return organizationsRoute({
    regions: [
      regionSlug,
      ...(getConnectedToRegions.value as RegionsCollectionItem["slug"][]),
    ],
  });
});

const suggestOrganizationTo = computed(() => ({
  path: "/suggest-organization",
  query: buildSuggestOrganizationQuery({
    search: search.value,
    regions: regions.value,
    regionCatalog: regionCatalog.value,
  }),
}));

const pageLastUpdate = computed(() => {
  if (!data.value?.orgs || data.value.orgs.length === 0) {
    return undefined;
  }

  // Get the most recent lastUpdate from the currently visible organizations
  const lastUpdates = data.value.orgs.map((org) => new Date(org.lastUpdate));
  const mostRecent = new Date(
    Math.max(...lastUpdates.map((date) => date.getTime()))
  );

  return mostRecent.toISOString();
});

const site = useSiteConfig();

const hasActiveFilters = computed(() =>
  Boolean(
    route.query.regions ||
    route.query.focus ||
    route.query.search ||
    (route.query.page && route.query.page !== "1") ||
    (route.query.sort && route.query.sort !== DEFAULT_SORT)
  )
);

useAppSeo({
  title: "Llistat d'entitats d'adopció d'animals a Catalunya",
  description:
    "Descobreix totes les entitats que permeten adopcions filtra per tipus o per comarques.",
  articleModifiedTime: pageLastUpdate,
  canonical: "/organizations",
  robots: computed(() =>
    hasActiveFilters.value ? "noindex, follow" : undefined
  ),
});

defineRouteRules({
  sitemap: {
    lastmod: "2025-10-31T00:00:00.000Z",
    changefreq: "monthly",
    priority: 0.8,
  },
});

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: "Llistat d'entitats d'adopció",
    description: "Llistat d'entitats d'adopció d'animals a Catalunya.",
  }),
  defineItemList({
    itemListElement: computed(() =>
      (data.value?.orgs || []).map((org, idx) => ({
        "@type": "ListItem",
        position: (page.value - 1) * ITEMS_PER_PAGE + idx + 1,
        url: `${site.url}/organizations/${org.slug}`,
        name: org.shortName,
        alternateName: org.name,
        sameAs: (org.socials || []).map((social) => social.url),
        description: org.description,
        image: org.enabledLogoUsage
          ? getOrganizationLogoPath(org.slug)
          : undefined,
      }))
    ),
    numberOfItems: computed(() => data.value?.orgsCount || 0),
    itemListOrder: "Ascending",
  }),
]);
</script>

<template>
  <div
    v-if="allOrgs || pending"
    class="lg:px-32 py-4 3xl:w-3/4 flex flex-col w-full px-1 justify-center items-center mx-auto gap-4 last:pb-4"
  >
    <div class="w-full flex flex-col xl:flex-row gap-4 px-4">
      <!-- Filters Sidebar (Comarques & Animals) -->
      <div class="w-full xl:w-80 flex flex-col lg:flex-row xl:flex-col gap-4">
        <div class="flex flex-col sm:flex-row xl:flex-col gap-4 w-full">
          <div class="w-full sm:w-1/2 xl:w-full flex flex-col gap-y-2">
            <div class="flex justify-between items-center">
              <label
                for="regions-select"
                class="text-sm font-semibold text-gray-900 dark:text-white"
                >Comarques:</label
              >
              <UButton
                class="h-5 cursor-pointer"
                color="primary"
                variant="ghost"
                label="La meva ubicació"
                :disabled="locatingComarca"
                @click="onClickMyLocationRegion"
              />
            </div>
            <USelectMenu
              id="regions-select"
              v-model="regions"
              class="w-full"
              multiple
              :items="regionCatalog"
              :loading="locatingComarca"
              :disabled="locatingComarca"
              value-key="slug"
              label-key="name"
              :placeholder="
                locatingComarca
                  ? 'Cercant la teva ubicació'
                  : 'Escull una comarca'
              "
              color="primary"
            />
          </div>
          <div class="w-full sm:w-1/2 xl:w-full flex flex-col gap-y-2">
            <label
              for="animals-select"
              class="text-sm font-semibold text-gray-900 dark:text-white"
              >Animals:</label
            >
            <USelectMenu
              id="animals-select"
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
        <!-- Search and Sort on top of results (right side on desktop) -->
        <div class="w-full mb-2 flex flex-col sm:flex-row gap-4">
          <!-- Search -->
          <div class="w-full grow flex flex-col gap-y-2">
            <label
              for="search-input"
              class="text-sm font-semibold text-gray-900 dark:text-white"
              >Cerca:</label
            >
            <UInput
              id="search-input"
              v-model="searchInput"
              placeholder="Cerca per nom o municipi"
              class="w-full"
              icon="i-lucide-search"
            />
          </div>
          <!-- Sort Selector -->
          <div class="w-full sm:w-52 flex flex-col gap-y-2">
            <label
              for="sort-select"
              class="text-sm font-semibold text-gray-900 dark:text-white"
              >Ordenar per:</label
            >
            <USelectMenu
              id="sort-select"
              v-model="sort"
              class="w-full"
              :search-input="false"
              :items="sortOptions"
              value-key="value"
              label-key="label"
              placeholder="Ordenar per"
              color="primary"
            />
          </div>
        </div>
        <!-- Results summary and clear filters -->
        <div
          ref="entryCardsTop"
          :style="{ scrollMarginTop: `${scrollOffset - 50}px` }"
          class="flex items-center justify-between w-full h-5"
        >
          <div v-if="pending" class="h-5">
            <USkeleton class="h-5 w-full rounded-md" />
          </div>

          <template v-else>
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
                    sort = DEFAULT_SORT;
                    resetFilters();
                  }
                "
              />
            </div>
          </template>
        </div>
        <!-- Filter badges -->
        <div
          v-if="filters.length > 0"
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
        <!-- Results grid -->
        <template v-if="pending">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2 gap-4 w-full"
          >
            <USkeleton v-for="n in 6" :key="n" class="h-56 w-full rounded-xl" />
          </div>
        </template>

        <template v-else>
          <AddOrganizationBanner
            v-if="data.orgsCount === 0"
            :to="suggestOrganizationTo"
            :expand-regions-to="expandRegionsTo"
          />
          <div v-else-if="hasAdjacentRegions" class="w-full">
            <UAlert
              color="neutral"
              variant="outline"
              icon="i-lucide-search"
              :ui="{
                description: 'text-base text-gray-600 dark:text-gray-300',
                icon: 'size-6',
              }"
            >
              <template #description>
                <div>
                  <span>
                    Pots trobar més resultats afegint les comarques adjacents
                    fent clic
                  </span>
                  <UButton
                    class="!p-0 !m-0"
                    color="primary"
                    variant="link"
                    :to="expandRegionsTo"
                    label="aquí."
                  />
                </div>
              </template>
            </UAlert>
          </div>
          <div
            v-if="data.orgsCount > 0"
            class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2 gap-4 w-full"
          >
            <OrganizationCard
              v-for="org in data.orgs"
              :key="org.id"
              :org="org"
            />
          </div>
          <div class="w-full flex justify-center">
            <UPagination
              v-if="
                data && data.orgsCount !== 0 && data.orgsCount > ITEMS_PER_PAGE
              "
              :page="page"
              :to="paginationTo"
              :items-per-page="ITEMS_PER_PAGE"
              :total="data.orgsCount"
              color="primary"
              @update:page="scrollToTop"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
