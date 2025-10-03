import { describe, expect, it } from 'vitest';
import { organizations } from '../../src/organization.js';
import {
  municipalityToRegion,
  regionToProvince,
} from '../../src/utils/locations.js';
import path from 'path';
import fs from 'fs';

describe('organizations', () => {
  it('checks duplicates', async () => {
    for (const org of organizations) {
      expect(organizations.filter((o) => o.id === org.id)).toHaveLength(1);
      expect(organizations.filter((o) => o.slug === org.slug)).toHaveLength(1);
      if (org.associativeInscriptionNumber) {
        expect(
          organizations.filter(
            (o) =>
              o.associativeInscriptionNumber &&
              o.associativeInscriptionNumber ===
                org.associativeInscriptionNumber,
          ),
        ).toHaveLength(1);
      }
      if (org.contactEmail) {
        expect(
          organizations.filter(
            (o) => o.contactEmail && o.contactEmail === org.contactEmail,
          ),
        ).toHaveLength(1);
      }
      if (org.website) {
        expect(
          organizations.filter((o) => o.website && o.website === org.website),
        ).toHaveLength(1);
      }
      if (org.name) {
        expect(organizations.filter((o) => o.name === org.name)).toHaveLength(
          1,
        );
      }
      if (org.description) {
        expect(
          organizations.filter((o) => o.description === org.description),
        ).toHaveLength(1);
      }
      if (org.whatsAppPhone) {
        expect(
          organizations.filter((o) => o.whatsAppPhone === org.whatsAppPhone),
        ).toHaveLength(1);
      }
      if (org.contactPhone) {
        expect(
          organizations.filter((o) => o.contactPhone === org.contactPhone),
        ).toHaveLength(1);
      }
      if (org.contactPhone2) {
        expect(
          organizations.filter((o) => o.contactPhone2 === org.contactPhone2),
        ).toHaveLength(1);
      }
      if (org.shelter && org.shelter.length > 0) {
        for (const shelter of org.shelter) {
          if (shelter.phone) {
            expect(
              organizations.filter(
                (o) =>
                  o.shelter &&
                  o.shelter.some((s) => s.phone && s.phone === shelter.phone),
              ),
            ).toHaveLength(1);
          }
        }
      }
      if (org.idZoologicalNucleus) {
        expect(
          organizations.filter(
            (o) => o.idZoologicalNucleus === org.idZoologicalNucleus,
          ),
        ).toHaveLength(1);
      }
    }
  });
  it('checks data', async () => {
    const phoneRegex = /^\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    const dateRegex =
      /^(?:(?:(?:19|20)\d{2})-(?:(?:(?:01|03|05|07|08|10|12)-(?:0[1-9]|[12]\d|3[01]))|(?:04|06|09|11)-(?:0[1-9]|[12]\d|30)|(?:02-(?:0[1-9]|1\d|2[0-8]))))T00:00:00\.000Z$|^(?:(?:19|20)(?:[02468][048]|[13579][26]))-02-29T00:00:00\.000Z$/;

    for (const org of organizations) {
      if (org.contactPhone) {
        expect(org.contactPhone).toMatch(phoneRegex);
      }
      if (org.contactPhone2) {
        expect(org.contactPhone2).toMatch(phoneRegex);
      }
      if (org.whatsAppPhone) {
        expect(org.whatsAppPhone).toMatch(phoneRegex);
      }
      if (org.shelter) {
        for (const shelter of org.shelter) {
          if (shelter.phone) expect(shelter.phone).toMatch(phoneRegex);
        }
      }
      if (org.contactEmail !== undefined) {
        expect(org.contactEmail).toMatch(emailRegex);
      }
      if (org.dateOfInscription) {
        expect(org.dateOfInscription).toMatch(dateRegex);
      }
      if (org.lastUpdate) {
        expect(org.lastUpdate).toMatch(dateRegex);
      }
      if (org.website !== undefined) {
        expect(org.website).toMatch(urlRegex);
      }
      if (org.socials?.some((s) => s.type === 'facebook')) {
        expect(org.socials.find((s) => s.type === 'facebook')?.url).toContain(
          'https://www.facebook.com/',
        );
      }
      if (org.socials?.some((s) => s.type === 'instagram')) {
        expect(org.socials.find((s) => s.type === 'instagram')?.url).toContain(
          'https://www.instagram.com/',
        );
      }
      if (org.socials?.some((s) => s.type === 'tiktok')) {
        expect(org.socials.find((s) => s.type === 'tiktok')?.url).toContain(
          'https://www.tiktok.com/',
        );
      }
      expect(org.province).toBe(regionToProvince[org.region]);
      expect(org.region).toBe(
        municipalityToRegion[org.municipalityInscription],
      );
    }
  });
  it('checks logos', async () => {
    // Get the project root directory (packages/shelters)
    const projectRoot = path.resolve(process.cwd());
    const logosDir = path.join(projectRoot, 'organizationLogos');
    for (const org of organizations.filter((o) => o.enabledLogoUsage)) {
      const logoPath = path.join(logosDir, `${org.slug}.webp`);
      expect(
        fs.existsSync(logoPath),
        `Logo missing for organization: ${org.slug} (${logoPath})`,
      ).toBe(true);
    }
  });
});
