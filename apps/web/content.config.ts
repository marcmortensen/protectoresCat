import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";

const regionSchema = z.union([
  z.literal("alt-camp"),
  z.literal("alt-emporda"),
  z.literal("alt-penedes"),
  z.literal("alt-urgell"),
  z.literal("alta-ribagorca"),
  z.literal("anoia"),
  z.literal("aran"),
  z.literal("bages"),
  z.literal("baix-camp"),
  z.literal("baix-ebre"),
  z.literal("baix-emporda"),
  z.literal("baix-llobregat"),
  z.literal("baix-penedes"),
  z.literal("barcelones"),
  z.literal("bergueda"),
  z.literal("cerdanya"),
  z.literal("conca-de-barbera"),
  z.literal("garraf"),
  z.literal("garrigues"),
  z.literal("garrotxa"),
  z.literal("girones"),
  z.literal("llucanes"),
  z.literal("maresme"),
  z.literal("moianes"),
  z.literal("montsia"),
  z.literal("noguera"),
  z.literal("osona"),
  z.literal("pallars-jussa"),
  z.literal("pallars-sobira"),
  z.literal("pla-de-lestany"),
  z.literal("pla-durgell"),
  z.literal("priorat"),
  z.literal("ribera-debre"),
  z.literal("ripolles"),
  z.literal("segarra"),
  z.literal("segria"),
  z.literal("selva"),
  z.literal("solsones"),
  z.literal("tarragones"),
  z.literal("terra-alta"),
  z.literal("urgell"),
  z.literal("valles-occidental"),
  z.literal("valles-oriental"),
]);

const provinceSchema = z.union([
  z.literal("barcelona"),
  z.literal("girona"),
  z.literal("lleida"),
  z.literal("tarragona"),
]);

const animalsSchema = z.union([
  z.literal("cats"),
  z.literal("dogs"),
  z.literal("cats&dogs"),
]);

export default defineContentConfig({
  collections: {
    provinces: defineCollection({
      type: "data",
      source: "provinces/*.json",
      schema: z.object({
        name: z.string(),
        slug: provinceSchema,
        regions: z.array(regionSchema),
      }),
    }),
    regions: defineCollection({
      type: "data",
      source: "regions/*.json",
      schema: z.object({
        name: z.string(),
        article: z.string(),
        slug: regionSchema,
        connectedTo: z.array(regionSchema),
        province: provinceSchema,
      }),
    }),
    organizations: defineCollection(
      asSitemapCollection({
        type: "page",
        source: "organizations/*.json",
        schema: z.object({
          id: z.string(),
          slug: z.string(),
          name: z.string(),
          shortName: z.string(),
          contactEmail: z.string().optional(),
          whatsAppPhone: z.string().optional(),
          contactPhone: z.string().optional(),
          contactPhone2: z.string().optional(),
          website: z.string().optional(),
          region: regionSchema,
          additionalRegions: z.array(regionSchema).optional(),
          province: provinceSchema,
          description: z.string(),
          adoptAnimalsURL: z.string().optional(),
          animalFocus: animalsSchema,
          shelter: z.union([
            z.array(
              z.object({
                adress: z.string(),
                googleMapsLink: z.string(),
                phone: z.union([z.string(), z.undefined()]),
                openingHoursURL: z.union([z.string(), z.undefined()]),
              })
            ),
            z.undefined(),
          ]),
          idZoologicalNucleus: z.string().optional(),
          associativeInscriptionNumber: z.string().optional(),
          dateOfInscription: z.string().optional(),
          municipality: z.string(),
          municipalityInscription: z.string(),
          isMunicipal: z.boolean(),
          isActive: z.boolean(),
          lastUpdate: z.string(),
          enabledLogoUsage: z.boolean(),
          socials: z
            .array(
              z.object({
                type: z.union([
                  z.literal("facebook"),
                  z.literal("instagram"),
                  z.literal("tiktok"),
                  z.literal("twitter"),
                ]),
                url: z.string(),
              })
            )
            .optional(),
          sitemap: z.object({
            lastmod: z.string(),
            changefreq: z.string(),
            priority: z.number(),
          }),
        }),
      })
    ),
    organizationByRegion: defineCollection({
      type: "data",
      source: "organizationsByRegion/*.json",
      schema: z.object({
        region: regionSchema,
        cats: z.number(),
        dogs: z.number(),
      }),
    }),
  },
});
