import config from "~/admin.config.json";

export const findSection = (modelName: string) => {
  return config.sections.find((section) =>
    section.models.find((model) => model.name === modelName)
  );
};

export const findModel = (name: string) => {
  const section = findSection(name);
  return section.models.find((model) => model.name === name);
};
