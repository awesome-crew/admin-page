import { Button, Seo } from "@/components/atoms";
import Fields, { CreateFieldsProps } from "./Fields";
import { ArrowLeftIcon } from "@/icons";

import { findModel, findSection } from "@/helpers";
import { useForm } from "@/hooks";
import { api } from "@/services";

import styles from "./index.module.scss";

export type CreateTemplateProps<Model> = {
  name: string;
  fields: CreateFieldsProps<Model>["fields"];
};

export function CreateTemplate<Model>({
  name,
  fields,
}: CreateTemplateProps<Model>) {
  const section = findSection(name);
  const model = findModel(name);

  const { form } = useForm();

  const isReady = fields.every((field) => form[field.name] != null);
  const submit = async () => {
    if (!isReady) {
      alert("모든 값을 입력해주세요.");
      return;
    }

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
      <h1 className={styles.title}>
        <ArrowLeftIcon className={styles.back} onClick={() => history.back()} />
        Create
        <Button className={styles.submit} onClick={submit}>
          완료
        </Button>
      </h1>
      <div className={styles.body}>
        <Fields fields={fields} />
      </div>
    </>
  );
}
