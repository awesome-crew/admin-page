import config from "~/admin.config";

export const findSection = (modelName: string) => {
  return config.sections.find((section) =>
    section.models.find((model) => model.name === modelName)
  );
};

export const findModel = (name: string) => {
  const section = findSection(name);
  if (!section) {
    return null;
  }
  return section.models.find((model) => model.name === name);
};
