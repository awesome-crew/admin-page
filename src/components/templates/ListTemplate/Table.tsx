import React, { ReactNode, useEffect, useState } from "react";
import dayjs from "dayjs";

import { ChevronLeftIcon, ChevronRightIcon, TrashCanIcon } from "@/icons";

import { api } from "@/services";

import styles from "./Table.module.scss";
import { PAGE_SIZE } from "./constants";

export type ListTableProps<Model> = {
  detail?: boolean;
  delete?: boolean;

  modelName: string;
  data: Model[];
  count: number;
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
      <Paginator count={props.count} />
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

const PAGINATOR_SIZE = 5;
function Paginator({ count }: { count: number }) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const offset = Number(params.get("offset") ?? 0);
    setPage(Math.floor(Math.max(0, offset) / PAGE_SIZE));
  }, []);

  const lastPage = Math.floor((count - 1) / PAGE_SIZE);

  const min = Math.floor(page / PAGINATOR_SIZE) * PAGINATOR_SIZE;
  const max = count ? Math.min(min + PAGINATOR_SIZE - 1, lastPage) : min;

  const move = (to: number) => {
    console.log(to);
    if (to < 0 || to > lastPage) {
      return;
    }

    const params = new URLSearchParams(location.search);
    params.set("offset", (to * PAGE_SIZE).toString());
    params.set("limit", "20");

    location.search = params.toString();
  };

  return (
    <ul className={styles.paginator}>
      {page > 0 && (
        <li onClick={() => move(page - 1)}>
          <ChevronLeftIcon />
        </li>
      )}
      {[...Array(max - min + 1)].map((_, index) => (
        <li
          key={min + index}
          data-current={min + index === page}
          onClick={() => move(min + index)}
        >
          {min + index + 1}
        </li>
      ))}
      {page < lastPage && (
        <li onClick={() => move(page + 1)}>
          <ChevronRightIcon />
        </li>
      )}
    </ul>
  );
}
