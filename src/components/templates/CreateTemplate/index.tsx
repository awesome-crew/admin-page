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

  const title = model.label + " 추가";

  return (
    <>
      <Seo title={title} />
      <span className={styles.breadcrumb}>
        {section.name} / {model.label}
      </span>
      <FormTemplate title={title} onSubmit={handleSubmit} fields={fields} />
    </>
  );
}
