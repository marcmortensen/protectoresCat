export type PublicOrganization = {
  name: string;
  shortName: string;
  province: string;
  municipality: string;
};

export type PublicOrganizationsBundle = {
  $schema: string;
  organizations: PublicOrganization[];
  total: number;
  generatedAt: string;
};
