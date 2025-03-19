import { describe, expect, it, vi } from 'vitest';
import { Organization } from '../../src/organization.js';
import { getAllAnimalsFromOrgs } from '../../src/animalsFromOrganizations.js';

vi.mock('../../src/organization.js', async (importOriginal) => {
  const originalModule =
    await importOriginal<typeof import('../../src/organization.js')>();
  return {
    ...originalModule,
    organizations: [
      {
        name: 'Organization_1',
        shortName: 'Org_1',
        isActive: true,
        exporter: () =>
          new Promise((resolve) => resolve([{ id: '1', name: 'Animal foo' }])),
      } as unknown as Organization,
      {
        name: 'Organization_2',
        shortName: 'Org_2',
        isActive: true,
        exporter: () =>
          new Promise((resolve) => resolve([{ id: '2', name: 'Animal bar' }])),
      } as unknown as Organization,
      {
        name: 'Organization_3',
        shortName: 'Org_3',
        isActive: true,
        exporter: () =>
          new Promise((resolve) =>
            resolve([{ id: '3', name: 'Animal foobar' }]),
          ),
      } as unknown as Organization,
      { exporter: undefined } as Organization,
      {
        name: 'Organization_4',
        shortName: 'Org_4',
        isActive: false,
        exporter: () =>
          new Promise((resolve) => resolve([{ id: '4', name: 'Animal bar' }])),
      } as unknown as Organization,
    ],
  };
});

describe('main', () => {
  const consoleSpy = vi.spyOn(console, 'log');

  it('fetches all animals from organizations', async () => {
    const animals = await getAllAnimalsFromOrgs();
    expect(animals).toStrictEqual([
      { id: '1', name: 'Animal foo' },
      { id: '2', name: 'Animal bar' },
      { id: '3', name: 'Animal foobar' },
    ]);
    expect(consoleSpy).toBeCalledWith(
      '1: Organization_1 has completed (Org_1)',
    );
    expect(consoleSpy).toBeCalledWith(
      '1: Organization_2 has completed (Org_2)',
    );
    expect(consoleSpy).toBeCalledWith(
      '1: Organization_3 has completed (Org_3)',
    );
  });
});
