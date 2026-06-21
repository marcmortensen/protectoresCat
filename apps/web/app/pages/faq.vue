<script setup lang="ts">
const items = [
  {
    label: "Per què fer aquesta plana?",
    description:
      "<p>Aquest recull pretén establir-se com a eina estàndard per ajudar totes les persones que participen en adopcions a Catalunya, apropant associacions a adoptants i voluntaris, i viceversa. Actualment ja existeixen reculls similars, però en consultar-los sovint els trobem desactualitzats o inactius. Per tal de no acabar així, aquest recull serà sempre obert, accessible, gratuït i públic.</p>",
  },
  {
    label: "Recull obert i col·laboratiu?",
    description: `<p>Tot el contingut d’aquesta plana és <a class="font-semibold hover:text-primary" href='https://github.com/marcmortensen/protectoresCat' rel='noopener' target='_blank'>obert i lliure</a> sota la llicència Apache, versió 2.0 (vegeu la <a class="font-semibold hover:text-primary" href='https://github.com/marcmortensen/protectoresCat/blob/master/apps/web/LICENSE' rel='noopener' target='_blank'>llicència</a> per a més detalls; el logotip i el nom de la plana no estan inclosos). Això vol dir que qualsevol persona el pot utilitzar, modificar i distribuir lliurement, sempre que respecti els termes de la llicència. D’aquesta manera, aquesta feina pot ser coordinada, compartida i millorada per tothom qui ho vulgui.</p>`,
  },
  {
    label: "Com puc contribuir?",
    description: `<p>Si vols contribuir <a class="font-semibold hover:text-primary" href='https://github.com/marcmortensen/protectoresCat' rel='noopener' target='_blank'> al recull</a>, pots fer-ho de diverses maneres: <a class="font-semibold hover:text-primary" href="/suggest-organization">afegint entrades noves</a>, notificant de dades errònies, fent difusió de la plana.</p>`,
  },
  {
    label: "Com a entitat que surt al recull, què s'espera de mi?",
    description:
      "<p>Res. Fora de l'autorització de l'ús del vostre logotip, no us demanarem res més. Mantenir la vostra informació actualitzada és feina nostra. No hi ha cap compromís participatiu ni econòmic per part vostra.</p>",
  },
  {
    label: "No vull sortir al recull, què puc fer?",
    description: `<p>Si no vols sortir al recull, pots contactar amb nosaltres a <a class="hover:text-primary" href='mailto:info@adoptar.cat'>info@adoptar.cat</a> i eliminarem la teva entrada.</p>`,
  },
  {
    label: "Per què no hi ha més entrades?",
    description:
      "<p>L'objectiu d'aquesta plana és proporcionar a la ciutadania una eina útil per trobar informació sobre entitats que permetin adopcions a prop del seu domicili. Per tal de garantir la qualitat de la informació, cal que siguin equipaments municipals o que estiguin degudament registrats a Catalunya i continuïn operant.</p>",
  },
  {
    label: "Com afegir una nova entrada al llistat?",
    description: `<p>Si coneixes una entitat que permet adopcions i que no és al nostre llistat, pots contactar amb nosaltres a <a class="hover:text-primary" href='mailto:info@adoptar.cat'>info@adoptar.cat</a> o bé <a class="font-semibold hover:text-primary" href="/suggest-organization">proposar-la des d\'aquest formulari</a>.</p>`,
  },
  {
    label: "M'he trobat un error, com ho puc notificar?",
    description: `<p>Si trobes un error, si us plau, contacta amb nosaltres a <a class="hover:text-primary" href='mailto:info@adoptar.cat'>info@adoptar.cat</a>, proporcionant tanta informació com sigui possible per ajudar-nos a reproduir el problema.</p>`,
  },
  {
    label: "Podeu afegir més regions d'Espanya?",
    description:
      "<p>El llistat només inclou entitats registrades a Catalunya. De moment, no tenim previst ampliar-lo a altres regions, ja que volem centrar els nostres esforços a mantenir una alta qualitat de les entrades.</p>",
  },
  {
    label: "Periodicitat de les actualitzacions?",
    description:
      "<p>La revisió de les entrades és manual; per tant, hi pot haver un cert desfasament entre el que es mostra a la plana i la realitat. Tot i això, es revisaran totes les entrades com a mínim un cop l'any, i la darrera data de revisió serà degudament visible a cadascuna de les entrades.</p>",
  },
];

useAppSeo({
  title: "Preguntes freqüents",
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
    lastmod: "2026-06-21T00:00:00.000Z",
    changefreq: "monthly",
    priority: 0.3,
  },
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 p-6 max-w-4xl mx-auto rounded shadow flex flex-col gap-4"
  >
    <header class="flex flex-col gap-3">
      <h1 class="text-3xl">Preguntes freqüents</h1>
      <p>
        Aquí trobaràs les preguntes més freqüents que rebem habitualment. Si no
        hi trobes la resposta que busques, no dubtis a contactar amb nosaltres a
        <a class="text-primary" href="mailto:info@adoptar.cat"
          >info@adoptar.cat</a
        >.
      </p>
    </header>
    <section class="space-y-6 mt-2">
      <article v-for="(item, index) in items" :key="item.label">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">
          {{ index + 1 }}. {{ item.label }}
        </h2>

        <div class="mt-1 prose max-w-none">
          <div v-html="item.description" />
        </div>
      </article>
    </section>
  </div>
</template>
