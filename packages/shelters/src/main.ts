//import { getAllAnimalsFromOrgs } from './animalsFromOrganizations.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { organizations } from './organization.js';
import { Region } from './utils/locations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const organizationsPath = path.resolve(__dirname, '../../organizations');
/*
const animals = (await getAllAnimalsFromOrgs()).sort((a, b) =>
  a.id.localeCompare(b.id),
);

console.log('Total animals fetched:', animals.length);

try {
  const filePath = path.join(projectRoot, 'animals.json');
  await fs.writeFile(filePath, JSON.stringify(animals, null, 2));
  console.log(`Animals data has been written to ${filePath}`);
} catch (error) {
  console.error('Error writing animals data:', error);
}

*/
const activeOrganizations = organizations.filter((a) => a.isActive);
try {
  for (const org of activeOrganizations) {
    const filePath = path.join(organizationsPath, `${org.slug}.json`);
    await fs.writeFile(filePath, JSON.stringify(org, null, 2));
  }
} catch (error) {
  console.error('Error writing organization data:', error);
}

const currentOrgs = activeOrganizations.map((org) => ({
  region: org.region,
  province: org.province,
  animalFocus: org.animalFocus,
  additionalRegions: org.additionalRegions,
}));
const regions: Region[] = [
  'alt-camp',
  'alt-emporda',
  'alt-penedes',
  'alt-urgell',
  'alta-ribagorca',
  'anoia',
  'aran',
  'bages',
  'baix-camp',
  'baix-ebre',
  'baix-emporda',
  'baix-llobregat',
  'baix-penedes',
  'barcelones',
  'bergueda',
  'cerdanya',
  'conca-de-barbera',
  'garraf',
  'garrigues',
  'garrotxa',
  'girones',
  'llucanes',
  'maresme',
  'moianes',
  'montsia',
  'noguera',
  'osona',
  'pallars-jussa',
  'pallars-sobira',
  'pla-de-lestany',
  'pla-durgell',
  'priorat',
  'ribera-debre',
  'ripolles',
  'segarra',
  'segria',
  'selva',
  'solsones',
  'tarragones',
  'terra-alta',
  'urgell',
  'valles-occidental',
  'valles-oriental',
];

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
