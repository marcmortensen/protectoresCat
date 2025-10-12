<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import type { AccordionItem } from "@nuxt/ui";
const selectedRegionId = ref<string[] | undefined>();
const hoveredRegionId = ref<string | null>();
const isSlideoverOpen = ref(false);

const allRegionItems = computed<AccordionItem[]>(() =>
  (data.value?.regions || []).map((region) => ({
    label: region.name,
    article: region.article,
    disabled: !data.value?.orgsByRegions.find((r) => r.region === region.slug),
    slug: region.slug,
  }))
);
const route = useRoute();

const { data } = await useAsyncData(
  route.path,
  async () => {
    const orgsCount = await queryCollection("organizations").count();
    const orgsByRegions = await queryCollection("organizationByRegion").all();
    const regions = await queryCollection("regions").all();

    return {
      orgsByRegions,
      regions,
      orgsCount,
    };
  },
  { immediate: true }
);

const regions = computed(() => {
  return data.value?.orgsByRegions.map((region) => ({
    id: region.region as string,
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

useSeoMeta({
  ogTitle: "Troba i adopta | Adoptar.cat",
  title: "Troba i adopta | Adoptar.cat",
  description:
    "Descobreix totes les entitats que permeten adopcions. Entra a la nostra plana web i escull per tipus o per comarques.",
  ogDescription:
    "Descobreix totes les entitats que permeten adopcions. Entra a la nostra plana web i escull per tipus o per comarques.",
  twitterCard: "summary_large_image",
  twitterTitle: "Troba i adopta | Adoptar.cat",
  twitterDescription:
    "Descobreix totes les entitats que permeten adopcions. Entra a la nostra plana web i escull per tipus o per comarques.",
  ogImage: "https://adoptar.cat/logo_w1200_h630.png",
  ogImageUrl: "https://adoptar.cat/logo_w1200_h630.png",
  twitterImage: "https://adoptar.cat/logo_w1200_h630.png",
});

defineRouteRules({
  sitemap: {
    lastmod: "2025-10-12T00:00:00.000Z",
    changefreq: "monthly",
    priority: 1,
  },
});

useSchemaOrg([
  defineOrganization({
    "@id": "https://adoptar.cat/#siteorg",
    name: "Adoptar.cat",
    url: "https://adoptar.cat",
    logo: "/logo_w1200_h630.png",
    description:
      "Adoptar.cat és una plataforma informativa i sense ànim de lucre que connecta adoptants amb entitats i voluntaris per promoure l'adopció responsable d'animals a Catalunya.",
  }),
]);
</script>

<template>
  <div class="bg-white dark:bg-gray-900 w-full h-full overflow-hidden relative">
    <div
      v-if="data"
      class="flex flex-col xl:flex-row w-full min-h-screen-height-header border-b"
    >
      <div
        class="xl:absolute w-full xl:pt-12 pb-4 flex-grow flex items-center justify-center"
      >
        <h1
          class="text-center px-4 text-5xl sm:text-35 uppercasete z-10 text-black dark:text-white font-title"
        >
          Escull per filtrar
        </h1>
      </div>
      <section
        class="h-96 xl:h-auto w-full xl:w-1/2 border-gray-dark border-t xl:border-t-0 bg-gray-light"
      >
        <div class="flex flex-row h-full">
          <div
            class="h-full border-gray-dark border-x border-b xl:border-l-0 xl:border-b-0 relative w-header xl:w-header flex-shrink-0"
          >
            <div
              class="absolute w-0 h-0 top-1/2 left-1/2 flex items-center justify-center"
            >
              <p
                class="uppercase transform text-gray-dark text-30 tracking-500 -rotate-90 lg:-rotate-90 dark:text-white text-black"
              >
                Tipus
              </p>
            </div>
          </div>
          <div
            class="flex-grow h-full overflow-y-hidden overflow-x-auto xl:overflow-x-hidden bg-gray-50 dark:bg-gray-800 bg-contain bg-center bg-no-repeat border-b xl:border-b-0"
          >
            <div class="h-full">
              <ul class="h-full flex items-center max-w-512 mx-auto">
                <li
                  v-for="(type, index) in ['cats', 'dogs']"
                  :key="index"
                  class="lg:w-1/3 px-4 text-center first:ml-auto last:mr-auto"
                >
                  <NuxtLink
                    class="mx-auto hover:text-primary text-gray"
                    :to="{ name: 'organizations', query: { focus: type } }"
                  >
                    <SvgoAnimalsCat1
                      v-if="type === 'cats'"
                      :font-controlled="false"
                      class="w-36 h-36 sm:w-64 sm:h-64 xl:w-40 xl:h-40 2xl:w-64 2xl:h-64"
                      alt="logo"
                    />
                    <SvgoAnimalsDog5
                      v-else
                      :font-controlled="false"
                      class="w-36 h-36 sm:w-64 sm:h-64 xl:w-40 xl:h-40 2xl:w-64 2xl:h-64"
                      alt="logo"
                    />
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        class="h-96 xl:h-auto w-full xl:w-1/2 bg-white dark:bg-gray-900 border-gray-dark"
      >
        <div class="flex xl:flex-row-reverse h-full">
          <div
            class="h-full border-gray-dark border-x xl:border-r-0 relative w-header xl:w-header flex-shrink-0"
          >
            <div
              class="absolute w-0 h-0 top-1/2 left-1/2 flex items-center justify-center"
            >
              <p
                class="uppercase transform text-gray-dark text-30 tracking-500 -rotate-90 xl:rotate-90 dark:text-white text-black"
              >
                Comarques
              </p>
            </div>
          </div>
          <div class="flex-grow h-full relative">
            <RegionsMap
              v-if="regions"
              v-model="selectedRegionId"
              :regions="regions"
              class="hidden xl:block transition-all duration-500 ease-in-out w-full h-full"
              :route-builder="regionRouteBuilder"
              @hover="hoveredRegionId = $event"
            />

            <RegionsMap
              v-if="regions"
              :regions="regions"
              class="block xl:hidden transition-all duration-500 ease-in-out w-full h-full"
              read-only
              @click="isSlideoverOpen = true"
            />

            <USlideover
              v-if="isSlideoverOpen"
              v-model:open="isSlideoverOpen"
              title="Comarques"
            >
              <template #body>
                <UAccordion :items="allRegionItems" :multiple="false">
                  <template #body="{ item }">
                    Veure totes les entitats
                    <UButton
                      class="pl-0"
                      variant="link"
                      :to="regionRouteBuilder(item.slug)"
                      :label="`${item.article}${item.label}.`"
                    /> </template
                ></UAccordion>
              </template>
            </USlideover>

            <div
              v-if="currentRegion"
              class="text-right absolute right-0 bottom-0 p-4 w-full flex flex-col items-end pointer-events-none"
            >
              <div class="text-6xl uppercase tracking-150 text-gray-dark">
                {{ currentRegion.name }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div
      class="w-full flex flex-col lg:flex-row p-4 gap-x-8 gap-y-4 text-black dark:text-white"
    >
      <p class="text-pretty lg:w-1/2 w-full">
        Som una eina per promoure l’adopció responsable d’animals i conscienciar
        sobre la importància de tenir cura de les mascotes de manera
        responsable. Estem compromesos a millorar la vida dels animals que ho
        necessiten i a trobar-los una llar plena d’estima. Hem creat un llistat
        d’entitats per apropar els adoptants i per fomentar l’adopció d’animals
        a Catalunya. Creiem que cada animal mereix una llar on sigui estimat, i
        treballem perquè això sigui una realitat. Som aquí per ajudar-te a
        trobar un punt de partida per conèixer el teu company ideal. Per
        donar-te suport, et proporcionem la informació i els recursos que
        necessites per prendre una decisió informada sobre l’adopció d’una
        mascota. Nosaltres no gestionem adopcions directament; som una
        plataforma que connecta adoptants amb entitats i voluntaris.
      </p>
      <p class="text-pretty lg:w-1/2 w-full">
        No som un refugi ni una associació de rescat, però volem ajudar-te a tu
        i a aquestes entitats a trobar-vos, perquè totes les parts implicades en
        surtin beneficiades. Totes les {{ data?.orgsCount }} entitats que
        apareixen al nostre web estan registrades al Registre d’entitats de
        Catalunya com a entitats jurídiques i han estat verificades. Estem
        compromesos a oferir-te la informació més precisa i actualitzada
        possible. Tingues en compte que la informació disponible al nostre lloc
        web és purament informativa. Et recomanem que facis la teva pròpia
        recerca abans de prendre qualsevol decisió relacionada amb l’adopció
        d’una mascota. No ens fem responsables de les decisions que es prenguin
        basant-se en la informació publicada al nostre web. Et convidem a
        contactar directament amb les entitats per obtenir més detalls sobre els
        seus serveis i polítiques.
      </p>
    </div>
  </div>
</template>
