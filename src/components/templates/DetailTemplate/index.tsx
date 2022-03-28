import { ButtonGroup, ButtonGroupProps } from "@/components/atoms";
import Fields, { DetailFieldsProps } from "./Fields";
import { ArrowLeftIcon } from "@/icons";

import { useDetailData } from "./useDetailData";

import { findModel } from "@/helpers";

import styles from "./index.module.scss";
import { API_URL } from "@/services";

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

  const getButtons = (): ButtonGroupProps["buttons"] => {
    return [
      model.edit && {
        label: "저장",
        type: "primary",
        htmlType: "submit",
        onClick: (e) => {
          e.preventDefault();
          console.log(e.target);
        },
      },
      ...(typeof buttons === "function" ? buttons(data) : buttons ?? []),
    ];
  };

  if (!data) {
    return null;
  }
  return (
    <>
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
