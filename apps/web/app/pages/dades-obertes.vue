<script setup lang="ts">
import type { PublicOrganizationsBundle } from "~/types/publicOrganizations";

const dataJsonUrl = "/data/organizations/data.json";
const schemaJsonUrl = "/data/organizations/schema.json";

useAppSeo({
  title: "Dades obertes",
  description:
    "Documentació JSON públics d'Adoptar.cat: llistat d'entitats que permeten adopacions a Catalunya, esquema i bones pràctiques per a desenvolupadors i reutilització.",
  articleModifiedTime: "2026-04-30T00:00:00.000Z",
});

useSchemaOrg([
  defineWebPage({
    name: "Dades obertes",
    description:
      "Informació sobre el conjunt de dades obert del llistat d'entitats per l'adopció a Catalunya.",
  }),
]);

defineRouteRules({
  sitemap: {
    lastmod: "2026-04-30T00:00:00.000Z",
    changefreq: "yearly",
    priority: 0.6,
  },
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 p-6 max-w-4xl mx-auto rounded shadow flex flex-col gap-6"
  >
    <h1 class="text-3xl">Dades obertes</h1>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">Què és</h2>
      <p>
        Adoptar.cat posa a disposició pública les dades agrupades que
        reflecteixen tots els organismes que permeten adoptar a Catalunya, per
        facilitar-ne la reutilització en aplicacions, mapes, estudis, eines o
        integracions assistides per model de llenguatge, sempre amb respecte cap
        a les entitats i les persones usuàries.
      </p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-2xl">On trobar els fitxers</h2>
      <ul class="list-none flex flex-col gap-5 pl-0">
        <li
          class="flex flex-col gap-3 rounded-lg border border-gray-200 dark:border-gray-600 p-4"
        >
          <p>schema.json</p>
          <p class="text-pretty">
            JSON Schema per validar i entendre l’estructura del fitxer de dades.
            Disponible a
            <a
              :href="schemaJsonUrl"
              class="font-semibold hover:text-primary break-all"
              target="_blank"
              rel="noopener noreferrer"
              >https://adoptar.cat/data/organizations/schema.json</a
            >.
          </p>
          <div
            class="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch"
          >
            <UButton
              :to="schemaJsonUrl"
              external
              target="_blank"
              rel="noopener noreferrer"
              icon="i-lucide-external-link"
              label="Obrir"
              size="sm"
              variant="outline"
              class="w-full justify-center sm:w-auto sm:min-w-48"
            />
            <UButton
              :to="schemaJsonUrl"
              external
              download="schema.json"
              icon="i-lucide-download"
              label="Descarregar"
              size="sm"
              variant="outline"
              class="w-full justify-center sm:w-auto sm:min-w-48"
            />
          </div>
        </li>
        <li
          class="flex flex-col gap-3 rounded-lg border border-gray-200 dark:border-gray-600 p-4"
        >
          <p>data.json</p>
          <p class="text-pretty">
            Conjunt de dades (JSON) amb totes les entitats actives i metadades
            del lot. Disponible a
            <a
              :href="dataJsonUrl"
              class="font-semibold hover:text-primary break-all"
              target="_blank"
              rel="noopener noreferrer"
              >https://adoptar.cat/data/organizations/data.json</a
            >.
          </p>
          <div
            class="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch"
          >
            <UButton
              :to="dataJsonUrl"
              external
              target="_blank"
              rel="noopener noreferrer"
              icon="i-lucide-external-link"
              label="Obrir"
              size="sm"
              variant="outline"
              class="w-full justify-center sm:w-auto sm:min-w-48"
            />
            <UButton
              :to="dataJsonUrl"
              external
              download="data.json"
              icon="i-lucide-download"
              label="Descarregar"
              size="sm"
              variant="outline"
              class="w-full justify-center sm:w-auto sm:min-w-48"
            />
          </div>
        </li>
      </ul>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">Limitacions</h2>
      <ul class="list-disc pl-5 flex flex-col gap-1">
        <li>Només s’inclouen entitats actives.</li>
        <li>
          El JSON és un lot adequat a consum programari, no una còpia de les
          fitxes de contingut que son editades al CMS.
        </li>
        <li>
          Algunes entitats tot i tenir refugi no el volen mostrar a la web, en
          aquests casos no apareixen aquests refugis en el JSON.
        </li>
        <li>
          No s’inclouen metadades internes de CMS ni logotips (ja que cal
          respectar la política d'ús de logotips).
        </li>
      </ul>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl">Ús i bona pràctica</h2>
      <p>
        Us animem a citar <strong>Adoptar.cat</strong> com a font quan
        reutilitzeu les dades, a respectar els camps opcionals, a comprovar
        <code class="text-sm">generatedAt</code> per saber la data de generació
        del lot. Eviteu sobrecarregar entitats amb missatges massius o
        automàtics que no respectin les seves vies de contacte habituals.
      </p>
      <p>
        Per al marc legal del lloc, vegeu també l’
        <NuxtLink
          :to="{ name: 'nota-legal' }"
          class="font-semibold hover:text-primary"
          >Avís legal</NuxtLink
        >.
      </p>
    </section>
  </div>
</template>
