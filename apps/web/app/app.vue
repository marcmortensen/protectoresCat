<script setup lang="ts">
import { ca } from "@nuxt/ui/locale";

const site = useSiteConfig();

useAppSeo({
  title: "Troba i adopta",
  description:
    "Descobreix totes les entitats que permeten adopcions. Entra a la nostra plana web i escull per tipus o per comarques.",
  robots: {
    index: true,
    follow: true,
    noimageindex: true,
  },
});
useSchemaOrg([
  defineWebSite({
    name: "Adoptar.cat",
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: [
        {
          "@type": "EntryPoint",
          urlTemplate: `${site.url}/organizations?search={search_term_string}`,
        },
      ],
      "query-input": "required name=search_term_string",
    },
  }),
  defineWebPage({
    name: "Adoptar.cat",
    description:
      "Cerca i descobreix totes les entitats d'adopció d'animals a Catalunya.",
  }),
]);
</script>

<template>
  <UApp :locale="ca">
    <CookieControl locale="ca" />
    <NuxtLayout class="font-display">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
