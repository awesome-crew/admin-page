export type AdminModel = {
  label: string;
  name: string;
  searchField?: string;
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
