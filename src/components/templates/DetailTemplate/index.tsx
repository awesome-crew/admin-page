import { Fragment, ReactNode } from "react";

import { ButtonGroup, ButtonGroupProps, Seo } from "@/components/atoms";
import Fields, { DetailFieldsProps } from "./Fields";
import { ArrowLeftIcon } from "@/icons";

import { useDetailData } from "./useDetailData";

import { findModel } from "@/helpers";
import { useForm } from "@/hooks";
import { api } from "@/services";

import styles from "./index.module.scss";

export type DetailTemplateProps<Model> = {
  name: string;
  title: (model: Model) => string;
  pk: string | number;
  buttons?:
    | ButtonGroupProps["buttons"]
    | ((model: Model) => ButtonGroupProps["buttons"]);
  fields: DetailFieldsProps<Model>["fields"];
  Extras?: Array<{
    label: string;
    render: (model: Model) => ReactNode;
  }>;
};

export function DetailTemplate<Model>({
  name,
  title,
  pk,
  buttons,
  fields,
  Extras,
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

  const deleteModel = async () => {
    if (
      !confirm("삭제된 데이터는 복구할 수 없습니다.\n정말로 삭제하시겠습니까?")
    ) {
      return;
    }

    try {
      await api.delete(`/${name}s/${pk}`);
      alert("삭제되었습니다.");
      history.back();
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
      model.delete && {
        label: "삭제",
        type: "danger",
        onClick: deleteModel,
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
      {Extras && data && (
        <div className={styles.body}>
          {Extras.map(({ label, render }) => (
            <Fragment key={label}>
              <h4>{label}</h4>
              {render(data)}
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
