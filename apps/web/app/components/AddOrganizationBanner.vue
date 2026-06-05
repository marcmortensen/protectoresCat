<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  to: RouteLocationRaw;
  expandRegionsTo?: RouteLocationRaw;
}>();

const description = computed(() =>
  props.expandRegionsTo
    ? "Si coneixes una entitat, pots afegir-la al llistat. També pots provar d'ampliar la cerca incloent les comarques adjacents."
    : "Si coneixes una entitat, pots afegir-la al llistat."
);

const alertUi = {
  root: "p-5",
  title: "text-xl font-semibold",
  description: "mt-2 text-base text-gray-600 dark:text-gray-300",
  icon: "size-6",
};
</script>

<template>
  <UAlert
    class="w-full md:hidden"
    color="neutral"
    variant="outline"
    title="No hem trobat resultats"
    :description="description"
    orientation="vertical"
    icon="i-lucide-search-x"
    :ui="{ ...alertUi, actions: 'w-full mt-3' }"
  >
    <template #actions>
      <div class="flex w-full flex-col gap-2">
        <UButton
          v-if="expandRegionsTo"
          class="w-full justify-center"
          label="Ampliar comarques"
          color="neutral"
          variant="outline"
          :to="expandRegionsTo"
        />
        <UButton
          class="w-full justify-center"
          label="Proposar una entitat"
          color="primary"
          :to="to"
        />
      </div>
    </template>
  </UAlert>

  <UAlert
    class="hidden w-full md:flex"
    color="neutral"
    variant="outline"
    title="No hem trobat resultats"
    :description="description"
    icon="i-lucide-search-x"
    orientation="horizontal"
    :ui="{
      ...alertUi,
      actions: 'flex-row flex-wrap items-center gap-2 shrink-0',
    }"
  >
    <template #actions>
      <UButton
        v-if="expandRegionsTo"
        label="Ampliar comarques"
        color="neutral"
        variant="outline"
        :to="expandRegionsTo"
      />
      <UButton label="Proposar una entitat" color="primary" :to="to" />
    </template>
  </UAlert>
</template>
