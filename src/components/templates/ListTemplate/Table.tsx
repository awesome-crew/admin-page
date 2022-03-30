import React, { ReactNode } from "react";
import dayjs from "dayjs";

import { Empty, Loading } from "@/components/atoms";
import { ChevronLeftIcon, ChevronRightIcon, TrashCanIcon } from "@/icons";

import { findModel } from "@/helpers";
import { useQuery } from "@/hooks";
import { api } from "@/services";

import { PAGE_SIZE } from "./constants";

import styles from "./Table.module.scss";

export type ListTableProps<Model> = {
  modelName: string;
  data: Model[];
  count?: number;
  fields: Array<
    | string
    | { label: string; name: string }
    | { label: string; value: (model: Model) => any }
    | { label: string; render: (model: Model) => ReactNode }
  >;
};

export default function ListTable<Model>(props: ListTableProps<Model>) {
  const model = findModel(props.modelName);

  const hasDetail = model?.detail;
  const hasDelete = model?.delete;

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
        style={{ cursor: hasDetail ? "pointer" : "default" }}
        onClick={
          hasDetail ? () => routeToDetail((record as any).id) : () => null
        }
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
        {hasDelete && (
          <td>
            <TrashCanIcon
              className={styles.delete}
              onClick={(e) => {
                e.stopPropagation();
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

  const isLoading = props.data == null;
  const isEmpty = props.data?.length === 0;

  return (
    <div className={styles.wrapper}>
      {props.count && <Paginator count={props.count} />}
      <table>
        <thead>
          <tr>
            {fieldNames.map((name) => (
              <th key={name}>{name}</th>
            ))}
            {hasDelete && <th />}
          </tr>
        </thead>
        <tbody>
          {(isLoading || isEmpty) && (
            <td colSpan={fieldNames.length + (hasDelete ? 1 : 0)}>
              {isLoading && <Loading size="large" />}
              {isEmpty && <Empty />}
            </td>
          )}
          {props.data?.map(renderRecord)}
        </tbody>
      </table>
      {props.count && <Paginator count={props.count} />}
    </div>
  );
}

function Cell({
  children,
}: {
  children: string | number | boolean | ReactNode;
}) {
  const isDate = (input: unknown): input is string =>
    typeof input === "string" && dayjs(input).isValid();

  const renderChildren = () => {
    if (isDate(children)) {
      return dayjs(children).format("YYYY/MM/DD HH:mm:ss");
    }
    if (typeof children === "boolean") {
      return children === true ? "✅" : "❌";
    }

    return children;
  };

  return <td>{renderChildren()}</td>;
}

const PAGINATOR_SIZE = 5;
function Paginator({ count }: { count: number }) {
  const { query, set } = useQuery();

  const page = Math.floor(Math.max(0, Number(query?.offset ?? 0)) / PAGE_SIZE);
  const lastPage = Math.floor((count - 1) / PAGE_SIZE);

  const min = Math.floor(page / PAGINATOR_SIZE) * PAGINATOR_SIZE;
  const max = count ? Math.min(min + PAGINATOR_SIZE - 1, lastPage) : min;

  const move = (to: number) => {
    if (to < 0 || to > lastPage) {
      return;
    }

    set({
      ...query,
      offset: to * PAGE_SIZE,
      limit: PAGE_SIZE,
    });
  };

  if (max <= min) {
    return null;
  }

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
