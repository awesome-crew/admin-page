import Fields, { FormFieldsProps } from "./Fields";
import { Button } from "@/components/atoms";
import { ArrowLeftIcon } from "@/icons";

import { useForm } from "@/hooks";

import styles from "./index.module.scss";

export type FormTemplateProps<Model> = {
  title: string;
  onSubmit: (form: any) => void;
  fields: FormFieldsProps<Model>["fields"];
};

export function FormTemplate<Model>({
  title,
  onSubmit,
  fields,
}: FormTemplateProps<Model>) {
  const { form } = useForm();

  const isReady = fields.every((field) => form[field.name] != null);

  const submit = () => {
    if (!isReady) {
      alert("모든 값을 입력해주세요.");
      return;
    }

    onSubmit(form);
  };

  return (
    <>
      <h1 className={styles.title}>
        <ArrowLeftIcon className={styles.back} onClick={() => history.back()} />
        {title}
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
