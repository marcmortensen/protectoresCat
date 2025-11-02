# @protectorescat/shelters

Node.js package that manages animal shelter and rescue organization data for Catalonia. This package contains the organizations data, validates it, and generates JSON files that are consumed by the web application.

## Overview

This package:
- Defines all animal shelter organizations in a TypeScript file
- Validates organization data through unit tests
- Generates JSON files for the web application
- Organizes organizations by region
- Handles logo file management

## Prerequisites

- Node.js 22.x or higher
- pnpm 10.19.0 or higher

## Project Structure

```
shelters/
├── src/
│   ├── organization.ts      # Main organizations data file
│   ├── main.ts              # Script that processes organizations
│   └── utils/
│       └── locations.ts     # Region, province, and municipality types
├── __tests__/
│   └── unit/
│       └── organizations.test.ts  # Validation tests
├── organizations/           # Generated JSON files (one per organization)
├── organizationsByRegion/   # Generated JSON files grouped by region
├── organizationLogos/       # Logo files (WebP format)
└── build/                   # Compiled JavaScript output
```

## Adding a New Organization

### Step 1: Edit organization.ts

Open `src/organization.ts` and add your new organization to the `organizations` array.

### Step 2: Required Fields

Every organization **must** include:

```typescript
{
  id: string;                    // Unique 8-char hex ID (e.g., 'a1b2c3d4')
  slug: string;                  // URL-friendly name (e.g., 'my-shelter')
  name: string;                  // Full organization name
  shortName: string;             // Short/common name
  region: Region;                 // From locations.ts (e.g., 'girones')
  province: Province;             // 'barcelona' | 'girona' | 'lleida' | 'tarragona'
  description: string;           // Description in Catalan
  adoptAnimalsURL: string;        // URL to view/adopt animals
  animalFocus: 'cats' | 'dogs' | 'cats&dogs';
  municipality: Municipality;    // Must match a value from locations.ts
  municipalityInscription: Municipality;
  isMunicipal: boolean;
  isActive: boolean;
  lastUpdate: string;             // ISO date: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
}
```

### Step 3: Optional Fields

You can also include:

```typescript
{
  contactEmail?: string;                       // Must be valid email format
  whatsAppPhone?: string;                     // 9 digits, no spaces
  contactPhone?: string;                       // 9 digits, no spaces
  contactPhone2?: string;                     // 9 digits, no spaces
  website?: string;                            // Must be valid URL (http/https)
  shelter?: Array<{                            // Physical shelter locations
    adress: string;
    googleMapsLink: string;
    phone?: string;                            // 9 digits
    openingHoursURL?: string;
  }>;
  additionalRegions?: Region[];               // Regions organization also has shelters at
  idZoologicalNucleus?: string;               // Zoological nucleus ID
  associativeInscriptionNumber?: string;      // Registration number
  dateOfInscription?: string;                 // Date when it was registered (ISO) 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  socials?: Array<{
    type: 'facebook' | 'instagram' | 'tiktok' | 'twitter';
    url: string;                               // Full URL
  }>;
  enabledLogoUsage?: boolean;                 // If true, logo file must exist
}
```

### Step 4: Data Validation Rules

The test suite enforces these rules:

- **Uniqueness**: IDs, slugs, emails, websites, phone numbers, and names must be unique
- **Phone Numbers**: Must be exactly 9 digits (no spaces or dashes)
- **Emails**: Must match valid email format
- **URLs**: Must start with `http://` or `https://`
- **Dates**: Must match ISO format: `YYYY-MM-DDT00:00:00.000Z`
- **Region/Province**: Must be consistent (province must match region)
- **Municipality/Region**: Must be consistent (municipality must map to correct region)
- **Social Media URLs**: 
  - Facebook URLs must contain `https://www.facebook.com/`
  - Instagram URLs must contain `https://www.instagram.com/`
  - TikTok URLs must contain `https://www.tiktok.com/`
- **Logo Files**: If `enabledLogoUsage` is `true`, a logo file must exist at `organizationLogos/{slug}.webp`

### Step 5: Generate a Unique ID

Use this command to generate a random 8-character hexadecimal ID:

```bash
   node -e "console.log(require('crypto').randomUUID().substr(0,8))"
```

Or use an online generator. The ID should be lowercase hexadecimal.

### Step 6: Find Valid Values

- **Regions**: See `src/utils/locations.ts` for all valid region values
- **Provinces**: `'barcelona' | 'girona' | 'lleida' | 'tarragona'`
- **Municipalities**: See `src/utils/locations.ts` for all valid municipality values
- **associativeInscriptionNumber**: See the oficial [registration list](https://analisi.transparenciacatalunya.cat/Legislaci-just-cia/Entitats-jur-diques-del-Registre-d-entitats-de-Cat/y6fz-g3ff/data_preview) to find its inscription number.

- **dateOfInscription**: See the oficial [registration list](https://analisi.transparenciacatalunya.cat/Legislaci-just-cia/Entitats-jur-diques-del-Registre-d-entitats-de-Cat/y6fz-g3ff/data_preview) to find its inscription date.
- **municipalityInscription**: See the oficial [registration list](https://analisi.transparenciacatalunya.cat/Legislaci-just-cia/Entitats-jur-diques-del-Registre-d-entitats-de-Cat/y6fz-g3ff/data_preview) to find its inscription municipality.

### Step 7: Complete Example

```typescript
{
  id: 'a1b2c3d4',
  slug: 'example-animal-rescue',
  name: 'Example Animal Rescue Association',
  shortName: 'Example Rescue',
  logo: 'https://example.com/logo.png',
  contactEmail: 'info@example.org',
  contactPhone: '972123456',
  whatsAppPhone: '972654321',
  website: 'https://example.org',
  region: 'girones',
  province: 'girona',
  description: 'Example Animal Rescue és una organització sense ànim de lucre dedicada al rescat i la reubicació d’animals abandonats a la comarca del Gironès.',
  adoptAnimalsURL: 'https://example.org/adopt',
  animalFocus: 'cats&dogs',
  shelter: [
    {
      adress: 'Carrer Example 123, 17001 Girona',
      googleMapsLink: 'https://maps.app.goo.gl/ABC123',
      phone: '972123456',
      openingHoursURL: 'https://example.org/hours',
    },
  ],
  municipalityInscription: 'Girona',
  municipality: 'Girona',
  isMunicipal: false,
  isActive: true,
  lastUpdate: '2025-01-15T00:00:00.000Z',
  associativeInscriptionNumber: '12345',
  dateOfInscription: '2020-05-10T00:00:00.000Z',
  socials: [
    {
      type: 'facebook',
      url: 'https://www.facebook.com/exampleanimalrescue',
    },
    {
      type: 'instagram',
      url: 'https://www.instagram.com/exampleanimalrescue/',
    },
  ],
  enabledLogoUsage: false,
}
```

## Running Tests

### Run Tests Once

```bash
pnpm test:unit-run
```

### Watch Mode

```bash
pnpm test:unit-watch
```

The test suite validates:
- Data format and types
- Uniqueness constraints
- Format validation (phones, emails, URLs, dates)
- Geographic consistency (region/province/municipality)
- Logo file existence when required

## Building

### Build TypeScript

```bash
pnpm build
```

This compiles TypeScript to JavaScript in the `build/` directory.

### Watch Mode

```bash
pnpm build:watch
```

### Type Check Only

```bash
pnpm tsc
```

## Processing Organizations

After adding or modifying organizations, you need to process them:

```bash
pnpm start
```

This command:
1. Removes old organization JSON files
2. Builds the TypeScript code (if needed)
3. Generates individual JSON files in `organizations/` (one per active organization)
4. Generates region-grouped JSON files in `organizationsByRegion/`
5. Copies organization files to `apps/web/content/organizations/`
6. Copies region files to `apps/web/content/organizationsByRegion/`
7. Copies logo files to `apps/web/public/organizationLogos/`

The prestart hook automatically:
- Cleans up old organization files
- Cleans up old region files

The poststart hook automatically:
- Moves generated files to the web app directories

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm build` | Compile TypeScript to JavaScript |
| `pnpm build:watch` | Watch mode for TypeScript compilation |
| `pnpm start` | Process organizations and generate JSON files |
| `pnpm test:unit-run` | Run unit tests once |
| `pnpm test:unit-watch` | Run unit tests in watch mode |
| `pnpm lint` | Lint source code |
| `pnpm prettier` | Format code with Prettier |
| `pnpm prettier:check` | Check code formatting |
| `pnpm clean` | Remove build artifacts and temporary files |
| `pnpm tsc` | Type check without emitting files |

## Logo Files

If an organization has `enabledLogoUsage: true`, you must:

1. Add a logo file in WebP format at: `organizationLogos/{slug}.webp` with size 190x190.
2. The filename must match the organization's `slug`
3. The logo will be copied to the web app during the `start` process

If its value is undefined, a request has been sent; if it’s false, the request has been denied.

## Troubleshooting

### Build Errors

- Ensure TypeScript compiles: `pnpm build`
- Check for syntax errors in `organization.ts`
- Verify all imports are correct

## License

See the [LICENSE](./LICENSE) file.