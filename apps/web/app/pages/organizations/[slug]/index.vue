<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
const route = useRoute();

const { history } = useRouter().options;

const slug = route.params.slug;
const { data } = await useAsyncData(
  route.path,
  async () => {
    const org = await queryCollection("organizations")
      .where("slug", "=", slug)
      .first();

    return { org };
  },
  { immediate: true }
);

const items = computed<BreadcrumbItem[]>(() => [
  {
    label: "Home",
    icon: "i-lucide-house",
    to: { name: "index" },
  },
  {
    label: "Organizations",
    icon: "i-lucide-box",
    to: (history.state.back as string) || { name: "organizations" },
  },
  {
    label: data.value?.org.shortName,
    icon: "i-lucide-link",
  },
]);
</script>

<template>
  <div>
    <UBreadcrumb :items="items" />
    <pre v-if="data && data.org">{{ data.org.shortName }}</pre>
    <pre v-else>ERROROROR</pre>
  </div>
</template>
