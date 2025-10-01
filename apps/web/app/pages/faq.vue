<script setup lang="ts">
const items = [
  {
    label: "Per què no hi ha més entrades?",
    description:
      "L'objectiu d'aquesta plana és proporcionar a la ciutadania una eina útil per a trobar informació sobre entitats que permetin adopcions prop del seu domicili. Per tal de garantir la qualitat de la informació cal que siguin equipaments municipals o que estiguin degudament registrades a Catalunya i continuïn operant.",
  },
  {
    label: "Com afegir una nova entrada al llistat?",
    description:
      "Si coneixes una entitat que permet adopcions i que no està al nostre llistat, pots contactar amb nosaltres a info@adoptar.cat.",
  },
  {
    label: "M'he trobat un error, què he de fer?",
    description:
      "Si trobes un error, si us plau, contacta amb nosaltres a info@adoptar.cat proporciont tanta informació com sigui possible per ajudar-nos a reproduir el problema.",
  },
  {
    label: "Podeu afegir més regions d'Espanya?",
    description:
      "El llistat només inclou entitats registrades a Catalunya, de moment no tenim previst ampliar el llistat a altres regions, ja que volem centrar els nostres esforços a mantenir una qualitat alta de les entrades.",
  },
  {
    label: "Periodicitat de les actualitzacions:",
    description:
      "La revisió de les entrades és manual, per tant, hi pot haver un cert biaix entre el qual es representa a la plana i la realitat. Tot i això, es revisaran totes les entrades com a mínim 2 cops per any, i l'última data de revisió serà degudament visible en cada una de les entrades.",
  },
];

useSeoMeta({
  title: "Preguntes freqüents | Adoptar.cat",
  description:
    "Consulta les preguntes més freqüents sobre el nostre llistat d'entitats i adopcions.",
  articleModifiedTime: "2025-08-20T00:00:00.000Z",
});
useSchemaOrg([
  defineWebPage({
    name: "Preguntes freqüents",
    description:
      "Consulta les preguntes més freqüents sobre el nostre llistat d'entitats i adopcions.",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.label,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.description,
      },
    })),
  }),
]);

defineRouteRules({
  sitemap: {
    lastmod: "2025-08-20T00:00:00.000Z",
    changefreq: "monthly",
    priority: 0.3,
  },
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 p-6 max-w-4xl mx-auto rounded shadow flex flex-col gap-4"
  >
    <UAccordion :items="items" :multiple="false" class="lg:px-4 px-2">
      <template #body="{ item }"> {{ item.description }}</template>
    </UAccordion>
  </div>
</template>
