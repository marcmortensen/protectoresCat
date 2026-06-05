import { z } from "zod";
import type {
  OrganizationsCollectionItem,
  ProvincesCollectionItem,
  RegionsCollectionItem,
} from "@nuxt/content";

export type ProvinceSlug = ProvincesCollectionItem["slug"];
export type AnimalFocus = OrganizationsCollectionItem["animalFocus"];
export type RegionSlug = RegionsCollectionItem["slug"];

export const PROVINCE_SLUGS = [
  "barcelona",
  "girona",
  "lleida",
  "tarragona",
] as const satisfies readonly ProvinceSlug[];

export const ANIMAL_FOCUS_VALUES = [
  "cats",
  "dogs",
  "cats&dogs",
] as const satisfies readonly AnimalFocus[];

export const PROVINCE_LABELS: Record<ProvinceSlug, string> = {
  barcelona: "Barcelona",
  girona: "Girona",
  lleida: "Lleida",
  tarragona: "Tarragona",
};

export const ANIMAL_FOCUS_LABELS: Record<AnimalFocus, string> = {
  cats: "Gats",
  dogs: "Gossos",
  "cats&dogs": "Gats i gossos",
};

export const PROVINCE_OPTIONS = PROVINCE_SLUGS.map((value) => ({
  label: PROVINCE_LABELS[value],
  value,
}));

export const ANIMAL_FOCUS_OPTIONS = ANIMAL_FOCUS_VALUES.map((value) => ({
  label: ANIMAL_FOCUS_LABELS[value],
  value,
}));

export const provinceSchema = z.enum(PROVINCE_SLUGS);
export const animalFocusSchema = z.enum(ANIMAL_FOCUS_VALUES);

export const DEFAULT_PROVINCE: ProvinceSlug = "barcelona";
export const DEFAULT_ANIMAL_FOCUS: AnimalFocus = "cats&dogs";

export function isProvinceSlug(value: string): value is ProvinceSlug {
  return (PROVINCE_SLUGS as readonly string[]).includes(value);
}
