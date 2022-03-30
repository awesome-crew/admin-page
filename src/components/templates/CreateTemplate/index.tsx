import { FormTemplate, FormTemplateProps } from "../FormTemplate";
import { Seo } from "@/components/atoms";

import { findModel, findSection } from "@/helpers";
import { api } from "@/services";

import styles from "./index.module.scss";

export type CreateTemplateProps<Model> = {
  name: string;
  fields: FormTemplateProps<Model>["fields"];
};

export function CreateTemplate<Model>({
  name,
  fields,
}: CreateTemplateProps<Model>) {
  const section = findSection(name);
  const model = findModel(name);

  const handleSubmit = async (form: any) => {
    try {
      await api.post(`/${name}s`, form);
      alert("생성되었습니다.");
      history.back();
    } catch {
      alert("실패했습니다.");
    }
  };

  return (
    <>
      <Seo title={model.label + " 생성"} />
      <span className={styles.breadcrumb}>
        {section.name} / {model.label}
      </span>
      <FormTemplate title="Create" onSubmit={handleSubmit} fields={fields} />
    </>
  );
}
