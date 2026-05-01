import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { organizations } from './organization.js';
import { REGION_SLUGS, type Region } from './utils/locations.js';
import {
  apiOrganizationsSchema,
  contentOrganizationsSchema,
  organizationSchema,
  PUBLIC_ORGANIZATIONS_DATA_JSON_SCHEMA_URI,
} from './organizationSchemas.js';
import { flattenError, toJSONSchema } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const organizationsPath = path.resolve(__dirname, '../../organizations');
const generatedPath = path.resolve(__dirname, '../../generated');

const activeOrganizations = organizations.filter((a) => a.isActive);
await fs.mkdir(generatedPath, { recursive: true });

const organizationsWrittenParsed: ReturnType<
  typeof contentOrganizationsSchema.parse
>[] = [];

try {
  for (const org of activeOrganizations) {
    const payload = {
      ...org,
      sitemap: {
        lastmod: org.lastUpdate,
        changefreq: 'monthly' as const,
        priority: 0.5,
      },
    };
    const parsed = contentOrganizationsSchema.safeParse(payload);
    if (!parsed.success) {
      console.error(
        `Invalid organization payload for ${org.slug}:`,
        flattenError(parsed.error),
      );
      throw new Error(`Schema validation failed for ${org.slug}`);
    }
    organizationsWrittenParsed.push(parsed.data);
    const filePath = path.join(organizationsPath, `${org.slug}.json`);
    await fs.writeFile(filePath, JSON.stringify(parsed.data, null, 2));
  }

  const organizationsPublic = organizationsWrittenParsed.map((row) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sitemap, logo, enabledLogoUsage, ...rest } = row;
    const again = organizationSchema.safeParse(rest);
    if (!again.success) {
      console.error(
        `Public strip/sitemap failed for ${row.slug}:`,
        flattenError(again.error),
      );
      throw new Error(
        'Public organizations payload invalid after removing sitemap',
      );
    }
    return again.data;
  });

  const generatedAt = new Date().toISOString();
  const apiOrganizationsResult = apiOrganizationsSchema.safeParse({
    $schema: PUBLIC_ORGANIZATIONS_DATA_JSON_SCHEMA_URI,
    organizations: organizationsPublic,
    generatedAt,
    total: organizationsPublic.length,
  });
  if (!apiOrganizationsResult.success) {
    console.error(
      'Invalid public bundle:',
      flattenError(apiOrganizationsResult.error),
    );
    throw new Error('Public organizations bundle validation failed');
  }
  await fs.writeFile(
    path.join(generatedPath, 'data.json'),
    JSON.stringify(apiOrganizationsResult.data, null, 2),
  );
  await fs.writeFile(
    path.join(generatedPath, 'schema.json'),
    JSON.stringify(toJSONSchema(apiOrganizationsSchema), null, 2),
  );
} catch (error) {
  console.error('Error writing organization data:', error);
}

const currentOrgs = activeOrganizations.map((org) => ({
  region: org.region,
  province: org.province,
  animalFocus: org.animalFocus,
  additionalRegions: org.additionalRegions,
}));
const regions: Region[] = [...REGION_SLUGS];

const missingRegions = regions.filter(
  (region) =>
    !currentOrgs.some(
      (org) =>
        org.region === region ||
        org.additionalRegions?.some((r) => r === region),
    ),
);

const organizationsByRegionPath = path.resolve(
  __dirname,
  '../../organizationsByRegion',
);

try {
  const orgsByRegion = currentOrgs.reduce((acc, org) => {
    const allRegions = [org.region, ...(org.additionalRegions ?? [])];

    for (const regionSlug of allRegions) {
      if (!acc[regionSlug]) {
        acc[regionSlug] = { region: regionSlug, cats: 0, dogs: 0 };
      }

      if (org.animalFocus === 'cats&dogs') {
        acc[regionSlug].cats++;
        acc[regionSlug].dogs++;
      } else {
        acc[regionSlug][org.animalFocus]++;
      }
    }
    return acc;
  }, {});

  const orgsByRegionArray = Object.values(orgsByRegion);
  for (const region of orgsByRegionArray) {
    const filePath = path.join(
      organizationsByRegionPath,
      `${region['region']}.json`,
    );
    await fs.writeFile(filePath, JSON.stringify(region, null, 2));
  }

  console.log(`Organizations length: ${currentOrgs.length}`);
  console.log(
    `missingRegions ${((missingRegions.length / regions.length) * 100).toFixed(0)}% , ${missingRegions.length} -  ${missingRegions.join(', ')}`,
  );
} catch (error) {
  console.error('Error writing organizationRegions data:', error);
}
