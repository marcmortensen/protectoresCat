import {
  MUNICIPALITY_NAMES,
  PROVINCE_SLUGS,
  REGION_SLUGS,
} from './utils/locations.js';
import { z } from 'zod';

/** Declared as root `$schema` in `data.json`; absolute URI for validators. */
export const PUBLIC_ORGANIZATIONS_DATA_JSON_SCHEMA_URI =
  'https://adoptar.cat/data/organizations/schema.json';

export const municipalitySchema = z.enum(MUNICIPALITY_NAMES);

export const regionSchema = z.enum(REGION_SLUGS);

export const provinceSchema = z.enum(PROVINCE_SLUGS);

export const animalFocusSchema = z.enum(['cats', 'dogs', 'cats&dogs'] as const);

export const organizationShelterEntrySchema = z.object({
  adress: z.string(),
  googleMapsLink: z.url(),
  phone: z.string().optional(),
  openingHoursURL: z.url().optional(),
});

export const organizationSocialSchema = z.object({
  type: z.union([
    z.literal('facebook'),
    z.literal('instagram'),
    z.literal('tiktok'),
    z.literal('twitter'),
  ]),
  url: z.url(),
});

export const organizationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  shortName: z.string(),
  logo: z.string().optional(),
  contactEmail: z.string().optional(),
  whatsAppPhone: z.string().optional(),
  contactPhone: z.string().optional(),
  contactPhone2: z.string().optional(),
  website: z.string().optional(),
  region: regionSchema,
  additionalRegions: z.array(regionSchema).optional(),
  province: provinceSchema,
  description: z.string(),
  adoptAnimalsURL: z.url().optional(),
  animalFocus: animalFocusSchema,
  shelter: z.array(organizationShelterEntrySchema).optional(),
  idZoologicalNucleus: z.string().optional(),
  associativeInscriptionNumber: z.string().optional(),
  dateOfInscription: z.iso.datetime().optional(),
  municipality: municipalitySchema,
  municipalityInscription: municipalitySchema.optional(),
  isMunicipal: z.boolean(),
  isActive: z.boolean(),
  lastUpdate: z.iso.datetime(),
  enabledLogoUsage: z.boolean().optional(),
  socials: z.array(organizationSocialSchema).optional(),
});

export type Organization = z.infer<typeof organizationSchema>;

export type Shelter = z.infer<typeof organizationShelterEntrySchema>;

export const contentOrganizationsSchema = organizationSchema.extend({
  sitemap: z.object({
    lastmod: z.iso.datetime(),
    changefreq: z.literal('monthly'),
    priority: z.number(),
  }),
});

export const organizationPublicSchema = organizationSchema.omit({
  logo: true,
  enabledLogoUsage: true,
  isActive: true,
});

export const apiOrganizationsSchema = z.object({
  $schema: z.literal(PUBLIC_ORGANIZATIONS_DATA_JSON_SCHEMA_URI),
  organizations: z.array(organizationPublicSchema),
  total: z.number(),
  generatedAt: z.iso.datetime(),
});
