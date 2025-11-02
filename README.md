# ProtectoresCat

A comprehensive database of active animal shelters and rescue organizations in Catalonia, Spain. This project provides a web application that helps people find adoption centers for cats and dogs across all regions of Catalonia.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Adding a New Organization](#adding-a-new-organization)
- [Testing](#testing)
- [Building](#building)
- [Running the Web Application](#running-the-web-application)
- [Contributing](#contributing)
- [License](#license)

## Overview

ProtectoresCat is a monorepo project that consists of:

- **`packages/shelters`**: A Node.js package that manages organization data and generates JSON files
- **`apps/web`**: A Nuxt.js web application that displays the organization information

## Project Structure

```
protectoresCat/
├── apps/
│   └── web/              # Nuxt.js web application
├── packages/
│   └── shelters/         # Organizations data management package
├── package.json          # Root package.json for workspace management
├── pnpm-workspace.yaml   # PNPM workspace configuration
└── turbo.json            # Turbo build configuration
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 22.x (required)
- **pnpm**: Version 10.19.0 or higher (this project uses pnpm exclusively)

### Installing Prerequisites

```bash
# Install Node.js 22.x using nvm (recommended)
nvm install 22
nvm use 22

# Install pnpm
npm install -g pnpm@10.19.0
```

## Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd protectoresCat
```

2. **Install dependencies**

```bash
pnpm install
```

This will install all dependencies for both the shelters package and the web application.

## Development

### Working with the Monorepo

This project uses:

- **pnpm workspaces** for dependency management
- **Turbo** for task orchestration and caching

All commands should be run from the root directory using pnpm.

## Adding a New Organization

To add a new animal shelter or rescue organization:

1. **Edit the organizations file**

   Open `packages/shelters/src/organization.ts` and add a new entry to the `organizations` array.

2. **Required Fields**

   Each organization entry must include these required fields:
   - `id`: A unique 8-character hexadecimal string (e.g., `'b1840f32'`)
   - `slug`: A URL-friendly identifier (e.g., `'caas'`)
   - `name`: Full legal organization name
   - `shortName`: Abbreviated or common name
   - `region`: One of the Catalan regions (see `packages/shelters/src/utils/locations.ts`)
   - `province`: One of `'barcelona' | 'girona' | 'lleida' | 'tarragona'`
   - `description`: A description of the organization (in Catalan)
   - `adoptAnimalsURL`: URL where people can view/adopt animals
   - `animalFocus`: One of `'cats' | 'dogs' | 'cats&dogs'`
   - `municipality`: The municipality name (must match a value from `Municipality` type)
   - `municipalityInscription`: Municipality where the organization was registered
   - `isMunicipal`: Boolean indicating if it's a municipal shelter/owned
   - `isActive`: Boolean indicating if the organization is currently active/requested to be removed.
   - `lastUpdate`: ISO date string (format: `'YYYY-MM-DDTHH:mm:ss.SSSZ'`)

3. **Optional Fields**
   - `contactEmail`: Contact email address
   - `whatsAppPhone`: WhatsApp phone number (9 digits, no spaces)
   - `contactPhone`: Primary contact phone (9 digits, no spaces)
   - `contactPhone2`: Secondary contact phone (9 digits, no spaces)
   - `website`: Organization website URL
   - `shelter`: Array of shelter locations with:
     - `adress`: Physical address
     - `googleMapsLink`: Google Maps link
     - `phone`: Shelter phone number (optional)
     - `openingHoursURL`: URL with opening hours info (optional)
   - `additionalRegions`: Array of additional regions the organization has shelter at
   - `idZoologicalNucleus`: Zoological nucleus ID
   - `associativeInscriptionNumber`: Registration number
   - `dateOfInscription`: ISO date string for registration date
   - `socials`: Array of social media links:
     - `type`: `'facebook' | 'instagram' | 'tiktok' | 'twitter'`
     - `url`: Full URL to the social media profile
   - `enabledLogoUsage`: Boolean indicating if logo can be used (for logo file requirements), orgs need to greenlight us using their logo.

4. **Example Entry**

   ```typescript
   {
     id: 'a1b2c3d4',
     slug: 'example-shelter',
     name: 'Example Animal Shelter',
     shortName: 'Example Shelter',
     logo: 'https://example.com/logo.png',
     contactEmail: 'contact@example.com',
     contactPhone: '972123456',
     website: 'https://example.com',
     region: 'girones',
     province: 'girona',
     description: `Una descripció de l’organització en català`,
     adoptAnimalsURL: 'https://example.com/adopt',
     animalFocus: 'cats&dogs',
     shelter: [
       {
         adress: '123 Main Street, Girona',
         googleMapsLink: 'https://maps.app.goo.gl/...',
         phone: '972123456',
         openingHoursURL: 'https://example.com/hours',
       },
     ],
     municipalityInscription: 'Girona',
     municipality: 'Girona',
     isMunicipal: false,
     isActive: true,
     lastUpdate: '2025-01-15T00:00:00.000Z',
     socials: [
       {
         type: 'facebook',
         url: 'https://www.facebook.com/example',
       },
     ],
   }
   ```

5. **Generate a unique ID**

   You can generate a random 8-character hexadecimal ID:

   ```bash
   node -e "console.log(require('crypto').randomUUID().substr(0,8))"
   ```

6. **Run tests to validate**

   After adding your organization, run the tests to ensure it passes validation:

   ```bash
   pnpm test-unit-run:shelters
   ```

   The tests will check:
   - Uniqueness of IDs, slugs, emails, websites, etc.
   - Phone number format (9 digits)
   - Email format
   - URL format
   - Date format
   - Region/province consistency
   - Municipality/region consistency

7. **Build and process organizations**

   After adding your organization and passing tests:

   ```bash
   cd packages/shelters
   pnpm build
   pnpm start
   ```

   This will:
   - Build the TypeScript code
   - Generate JSON files for each organization in `packages/shelters/organizations/`
   - Generate region-based organization files in `packages/shelters/organizationsByRegion/`
   - Copy the generated files to the web app's content directory

For more detailed information, see [packages/shelters/README.md](packages/shelters/README.md).

## Testing

### Run All Tests

```bash
# Run all unit tests
pnpm test-unit-run:all

# Run tests for shelters package only
pnpm test-unit-run:shelters
```

### Watch Mode

```bash
# Watch mode for all tests
pnpm test-unit-watch:all

# Watch mode for shelters package only
pnpm test-unit-watch:shelters
```

## Building

### Build All Packages

```bash
# Build all packages
pnpm build:web

# Build shelters package
cd packages/shelters
pnpm build
```

### Type Checking

```bash
# Type check all packages
pnpm tsc:all

# Type check shelters package
pnpm tsc:shelters

# Type check web app
pnpm tsc:web
```

## Running the Web Application

### Development Server

To run the web application in development mode:

```bash
cd apps/web
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Production Build

To build the web application for production:

```bash
cd apps/web
pnpm build
```

### Preview Production Build

To preview the production build locally:

```bash
cd apps/web
pnpm preview
```

For more detailed information, see [apps/web/README.md](apps/web/README.md).

## Workflow: Adding Organization to Web App

The complete workflow when adding a new organization:

1. Add the organization entry to `packages/shelters/src/organization.ts`
2. Run tests: `pnpm test-unit-run:shelters`
3. Build the shelters package: `cd packages/shelters && pnpm build`
4. Process organizations: `cd packages/shelters && pnpm start`
   - This generates JSON files and copies them to the web app
5. Start the web app: `cd apps/web && pnpm dev`
6. Verify the new organization appears in the web application

## Contributing

Contributions are welcome! When contributing:

1. Ensure all tests pass
2. Follow the existing code style
3. Update/Add relevant documentation

## License

See individual LICENSE files in each package:

- [`packages/shelters/LICENSE`](packages/shelters/LICENSE) - Apache-2.0
- [`apps/web/LICENSE`](apps/web/LICENSE) - Apache-2.0
