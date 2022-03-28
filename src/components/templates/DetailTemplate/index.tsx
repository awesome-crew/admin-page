import { ButtonGroup, ButtonGroupProps, Seo } from "@/components/atoms";
import Fields, { DetailFieldsProps } from "./Fields";
import { ArrowLeftIcon } from "@/icons";

import { useDetailData } from "./useDetailData";

import { findModel } from "@/helpers";
import { useForm } from "@/hooks";

import styles from "./index.module.scss";
import { api } from "@/services";

export type DetailTemplateProps<Model> = {
  name: string;
  title: (model: Model) => string;
  pk: string | number;
  buttons?:
    | ButtonGroupProps["buttons"]
    | ((model: Model) => ButtonGroupProps["buttons"]);
  fields: DetailFieldsProps<Model>["fields"];
};

export function DetailTemplate<Model>({
  name,
  title,
  pk,
  buttons,
  fields,
}: DetailTemplateProps<Model>) {
  const model = findModel(name);
  const data = useDetailData<Model>(name, pk);
  const { form } = useForm();

  const save = async () => {
    try {
      await api.patch(`/${name}s/${pk}`, form);
      alert("저장되었습니다.");
      location.reload();
    } catch {
      alert("실패했습니다.");
    }
  };

  const getButtons = (): ButtonGroupProps["buttons"] => {
    return [
      model.edit && {
        label: "저장",
        type: "primary",
        onClick: save,
      },
      ...(typeof buttons === "function" ? buttons(data) : buttons ?? []),
    ];
  };

  if (!data) {
    return null;
  }
  return (
    <>
      <Seo title={title(data)} />
      <h1 className={styles.title}>
        <ArrowLeftIcon className={styles.back} onClick={() => history.back()} />
        {title(data)}
        <ButtonGroup buttons={getButtons()} />
      </h1>
      <div className={styles.body}>
        <Fields data={data} fields={fields} />
      </div>
    </>
  );
}
