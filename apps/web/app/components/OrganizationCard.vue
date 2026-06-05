<script setup lang="ts">
import type { OrganizationsCollectionItem } from "@nuxt/content";

defineProps<{
  org: Pick<
    OrganizationsCollectionItem,
    | "id"
    | "slug"
    | "name"
    | "shortName"
    | "municipality"
    | "description"
    | "animalFocus"
    | "enabledLogoUsage"
  >;
}>();
</script>

<template>
  <NuxtLink
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
            v-if="org.enabledLogoUsage"
            format="avif,webp"
            :src="getOrganizationLogoPath(org.slug)"
            :alt="`Logotip de ${org.name}`"
            :img-attrs="{
              class: 'h-48 sm:w-full md:h-full md:w-48 max-h-48',
            }"
          />
          <template v-else>
            <SvgoAnimalsCat1
              v-if="
                org.animalFocus === 'cats&dogs' || org.animalFocus === 'cats'
              "
              :font-controlled="false"
              class="h-48"
            />
            <SvgoAnimalsDog5
              v-if="
                org.animalFocus === 'cats&dogs' || org.animalFocus === 'dogs'
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
          <div class="mt-1 text-sm font-semibold tracking-wide line-clamp-1">
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
</template>
