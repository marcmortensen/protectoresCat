import type { RegionsCollectionItem } from "@nuxt/content";
import {
  isProvinceSlug,
  type ProvinceSlug,
  type RegionSlug,
} from "./organizationConstants";

export const SUGGEST_ORG_QUERY = {
  name: "name",
  province: "province",
} as const;

export function buildSuggestOrganizationQuery(opts: {
  search?: string;
  regions?: RegionSlug[];
  regionCatalog?: Pick<RegionsCollectionItem, "slug" | "province">[];
}): Record<string, string> {
  const query: Record<string, string> = {};
  const name = opts.search?.trim();

  if (name) {
    query[SUGGEST_ORG_QUERY.name] = name;
  }

  if (opts.regions?.length === 1 && opts.regionCatalog) {
    const region = opts.regionCatalog.find((r) => r.slug === opts.regions![0]);
    if (region?.province) {
      query[SUGGEST_ORG_QUERY.province] = region.province;
    }
  }

  return query;
}

export function parseSuggestOrganizationQuery(query: Record<string, unknown>): {
  name?: string;
  province?: ProvinceSlug;
} {
  const result: { name?: string; province?: ProvinceSlug } = {};

  const name = query[SUGGEST_ORG_QUERY.name];
  if (typeof name === "string" && name.trim()) {
    result.name = name.trim();
  }

  const province = query[SUGGEST_ORG_QUERY.province];
  if (typeof province === "string" && isProvinceSlug(province)) {
    result.province = province;
  }

  return result;
}
