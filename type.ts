export type AdminConfig = {
  name: string;
  apiUrl: string;
  sections: Array<{
    name: string;
    models: Array<{
      label: string;
      name: string;
      searchField?: string;
      list?: boolean;
      create?: boolean;
      delete?: boolean;
      detail?: boolean;
      edit?: boolean;
    }>;
  }>;
};
