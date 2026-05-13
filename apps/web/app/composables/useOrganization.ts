import type { MaybeRefOrGetter } from "vue";
import { until } from "@vueuse/core";
import { ORGANIZATION_NOT_FOUND } from "~/app.errors";

export function useOrganization(slug: MaybeRefOrGetter<string>) {
  const orgKey = computed(() => `organization-${toValue(slug)}`);

  const { data, pending, error } = useLazyAsyncData(orgKey, async () => {
    const value = toValue(slug);
    const result = await queryCollection("organizations")
      .where("slug", "=", value)
      .first();

    if (!result) {
      throw createError({
        status: 404,
        statusText: "Organization not found",
        fatal: true,
        data: {
          id: ORGANIZATION_NOT_FOUND,
          slug: value,
        },
      });
    }

    return result;
  });

  if (import.meta.server) {
    onServerPrefetch(async () => {
      await until(pending).toBe(false);
      if (error.value) throw error.value;
    });
  }

  watch(error, (err) => {
    if (err) showError(err);
  });

  return {
    data,
    pending,
    error,
  };
}
