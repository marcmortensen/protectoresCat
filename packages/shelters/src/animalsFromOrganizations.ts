import { organizations } from './organization.js';

export interface Animal {
  id: string;
  name: string;
  isMale: boolean;
  breed: string;
  internalId: string;
  dateOfBirth: string;
  images: string[];
  originUrl: string;
  type: 'dog' | 'cat' | 'other';
  size: 'small' | 'medium' | 'large';
  organizationId: string;
  dateOfAdmission: string;
  isReadyForAdoption: boolean;
}
export interface Dog extends Animal {
  type: 'dog';
}
export interface Cat extends Animal {
  type: 'cat';
}

export const getAllAnimalsFromOrgs = async (): Promise<Animal[]> => {
  let arr: Animal[] = [];
  for (const org of organizations.filter(
    (org) => org.exporter !== undefined && org.isActive,
  )) {
    const asyncResult = await org.exporter();
    console.log(
      `${asyncResult.length}: ${org.name} has completed (${org.shortName})`,
    );
    arr = [...arr, ...asyncResult];
  }
  return arr;
};
