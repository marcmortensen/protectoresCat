<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { ORGANIZATION_NOT_FOUND } from "./app.errors";

const error = useError();

const statusCode = computed(() => error.value?.status ?? 500);
const statusMessage = computed(() => error.value?.statusText ?? "Server error");

const isOrgNotFound = computed(
  () =>
    (error.value?.data as { id?: string } | undefined)?.id ===
    ORGANIZATION_NOT_FOUND
);
const isNotFound = computed(() => statusCode.value === 404);

const event = useRequestEvent();
if (import.meta.server && event) {
  setResponseStatus(event, statusCode.value, statusMessage.value);
}

const dataError = computed<{
  title: string;
  heading: string;
  lead: string;
  body: string;
  redirectTo: RouteLocationRaw;
}>(() => {
  if (isOrgNotFound.value) {
    return {
      title: "Pàgina no trobada",
      heading: "404",
      lead: "Aquesta entitat no existeix.",
      body: "Potser ha estat eliminada, o l'enllaç és incorrecte.",
      redirectTo: { name: "organizations" },
    };
  }
  if (isNotFound.value) {
    return {
      title: "Pàgina no trobada",
      heading: "404",
      lead: "La pàgina no s'ha trobat.",
      body: "Potser ha estat eliminada o no existeix.",
      redirectTo: { name: "index" },
    };
  }
  return {
    title: "Error del servidor",
    heading: String(statusCode.value),
    lead: "Hem tingut un problema.",
    body: "Torna-ho a provar d'aquí a uns minuts.",
    redirectTo: { name: "index" },
  };
});

useAppSeo({
  title: () => dataError.value.title,
  description: () => `${dataError.value.lead} ${dataError.value.body}`,
  robots: { index: false, follow: false },
});
</script>
<template>
  <UApp class="font-display">
    <NuxtLayout>
      <div
        class="h-screen max-w-screen bg-white dark:bg-gray-900 flex items-center"
      >
        <div
          class="container flex flex-col-reverse md:flex-row items-center justify-center px-5 text-gray-700 dark:text-white gap-4"
        >
          <div class="max-w-md">
            <div class="text-5xl font-dark font-bold">
              {{ dataError.heading }}
            </div>
            <p class="text-2xl md:text-3xl font-light leading-normal">
              {{ dataError.lead }}
            </p>
            <p class="mb-8">{{ dataError.body }}</p>

            <UButton
              icon="i-lucide-house"
              label="Tornar a l'inici"
              :to="dataError.redirectTo"
            />
          </div>
          <div class="max-w-lg flex justify-center h-full w-full">
            <SvgoAnimalsCatTripMilk
              :font-controlled="false"
              class="h-full w-full"
            />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </UApp>
</template>
