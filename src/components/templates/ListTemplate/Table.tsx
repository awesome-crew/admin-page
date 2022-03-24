import React, { ReactNode } from "react";
import dayjs from "dayjs";

import { TrashCanIcon } from "@/icons";

import { api } from "@/services";

import styles from "./Table.module.scss";

export type ListTableProps<Model> = {
  detail?: boolean;
  delete?: boolean;

  modelName: string;
  data: Model[];
  fields: Array<
    | string
    | { label: string; name: string }
    | { label: string; value: (model: Model) => any }
    | { label: string; render: (model: Model) => ReactNode }
  >;
};

export default function ListTable<Model>(props: ListTableProps<Model>) {
  const fieldNames = props.fields.map((field) => {
    if (typeof field === "string") {
      return field;
    }
    return field.label;
  });

  const routeToDetail = (id: number) => {
    location.href = `/${props.modelName}s/${id}`;
  };

  const renderRecord = (record: Model) => {
    return (
      <tr
        key={JSON.stringify(record)}
        style={{ cursor: props.detail ? "pointer" : "default" }}
        onClick={() => routeToDetail((record as any).id)}
      >
        {props.fields.map((field) => (
          <Cell key={JSON.stringify(field)}>
            {typeof field === "string"
              ? record[field as keyof Model]
              : "name" in field
              ? record[field.name as keyof Model]
              : "value" in field
              ? field.value(record)
              : field.render(record)}
          </Cell>
        ))}
        {props.delete && (
          <td>
            <TrashCanIcon
              className={styles.delete}
              onClick={() => {
                deleteRecord((record as any).id);
              }}
            />
          </td>
        )}
      </tr>
    );
  };

  const deleteRecord = async (id: number) => {
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }
    await api.delete(`/${props.modelName}s/${id}`);
    alert("삭제되었습니다.");
    location.reload();
  };

  return (
    <div className={styles.wrapper}>
      <table>
        <thead>
          <tr>
            {fieldNames.map((name) => (
              <th key={name}>{name}</th>
            ))}
            {props.delete && <th />}
          </tr>
        </thead>
        <tbody>{props.data?.map(renderRecord)}</tbody>
      </table>
    </div>
  );
}

function Cell({ children }: { children: string | number | ReactNode }) {
  const isDate = (input: unknown): input is string =>
    typeof input === "string" && dayjs(input).isValid();

  return (
    <td>
      {isDate(children)
        ? dayjs(children).format("YYYY/MM/DD HH:mm:ss")
        : children}
    </td>
  );
}
