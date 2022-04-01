export type AdminModel = {
  label: string;
  name: string;
  description?: string;

  searchFieldName?: string;
  searchFieldLabel?: string;

  list?: boolean;
  create?: boolean;
  delete?: boolean;
  detail?: boolean;
  edit?: boolean;
};

export type AdminSection = {
  name: string;
  models: AdminModel[];
};

export type AdminConfig = {
  name: string;
  apiUrl: string;
  sections: AdminSection[];
};
