import type { RegionsCollectionItem } from "@nuxt/content";

export function useRegions() {
  const { data, pending } = useLazyAsyncData("regions-list", () =>
    queryCollection("regions").all()
  );

  const regions = computed(() =>
    data.value?.map((region) => ({
      ...region,
      id: region.slug,
    }))
  );

  return {
    data: regions,
    pending,
  };
}
