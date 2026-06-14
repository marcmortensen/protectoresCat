import type { OrganizationsCollectionItem } from "@nuxt/content";

export type OrganizationListItem = Pick<
  OrganizationsCollectionItem,
  | "id"
  | "slug"
  | "name"
  | "shortName"
  | "municipality"
  | "description"
  | "animalFocus"
  | "enabledLogoUsage"
  | "lastUpdate"
  | "region"
  | "additionalRegions"
  | "socials"
>;

export type OrganizationSortType = "last-revised" | "title" | "-title";

export type OrganizationListFilters = {
  search: string;
  regions: string[];
  animalTypes: string[];
  sort: OrganizationSortType;
};

function matchesSearch(org: OrganizationListItem, search: string): boolean {
  if (!search) {
    return true;
  }
  const term = search.toLowerCase();
  return (
    org.name.toLowerCase().includes(term) ||
    org.municipality.toLowerCase().includes(term) ||
    org.shortName.toLowerCase().includes(term)
  );
}

function matchesRegions(org: OrganizationListItem, regions: string[]): boolean {
  if (regions.length === 0) {
    return true;
  }
  return regions.some(
    (slug) =>
      org.region === slug ||
      org.additionalRegions?.some((region) => region === slug)
  );
}

function matchesAnimalTypes(
  org: OrganizationListItem,
  animalTypes: string[]
): boolean {
  if (animalTypes.length === 0) {
    return true;
  }
  if (org.animalFocus === "cats&dogs") {
    return true;
  }
  return animalTypes.includes(org.animalFocus);
}

function sortOrganizations(
  orgs: OrganizationListItem[],
  sort: OrganizationSortType
): OrganizationListItem[] {
  const sorted = [...orgs];
  switch (sort) {
    case "title":
      return sorted.sort((a, b) =>
        a.shortName.localeCompare(b.shortName, "ca")
      );
    case "-title":
      return sorted.sort((a, b) =>
        b.shortName.localeCompare(a.shortName, "ca")
      );
    case "last-revised":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
      );
  }
}

export function filterOrganizations(
  orgs: OrganizationListItem[],
  filters: OrganizationListFilters
): OrganizationListItem[] {
  const filtered = orgs.filter(
    (org) =>
      matchesSearch(org, filters.search) &&
      matchesRegions(org, filters.regions) &&
      matchesAnimalTypes(org, filters.animalTypes)
  );
  return sortOrganizations(filtered, filters.sort);
}

export function paginateOrganizations<T>(
  orgs: T[],
  page: number,
  itemsPerPage: number
): T[] {
  const start = (page - 1) * itemsPerPage;
  return orgs.slice(start, start + itemsPerPage);
}

export type OrganizationsListQueryState = {
  regions?: string[];
  animalTypes?: string[];
  search?: string;
  sort?: OrganizationSortType;
  page?: number;
};

export function buildOrganizationsListQuery(
  state: OrganizationsListQueryState,
  defaults: { sort: OrganizationSortType } = { sort: "last-revised" }
): Record<string, string> {
  const query: Record<string, string> = {};
  const regions = state.regions ?? [];
  const animalTypes = state.animalTypes ?? [];
  const search = state.search ?? "";
  const sort = state.sort ?? defaults.sort;
  const page = state.page ?? 1;

  if (regions.length > 0) {
    query.regions = regions.join(",");
  }
  if (animalTypes.length > 0) {
    query.focus = animalTypes.join(",");
  }
  if (search) {
    query.search = search;
  }
  if (sort !== defaults.sort) {
    query.sort = sort;
  }
  if (page > 1) {
    query.page = String(page);
  }

  return query;
}
