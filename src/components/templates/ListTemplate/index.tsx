import { ButtonGroup, ButtonGroupProps } from "@/components/atoms";
import SearchBar from "./SearchBar";
import Table, { ListTableProps } from "./Table";
import Filter, { ListFilterProps } from "./Filter";

import { useListCount } from "./useListCount";
import { useListData } from "./useListData";

import styles from "./index.module.scss";

import config from "~/admin.config.json";

export type ListTemplateProps<Model> = {
  name: string;
  filters?: ListFilterProps["filters"];
} & Pick<ButtonGroupProps, "buttons"> &
  Pick<ListTableProps<Model>, "fields">;

export function ListTemplate<Model>({
  name,
  buttons,
  fields,
  filters,
}: ListTemplateProps<Model>) {
  const section = config.sections.find((section) =>
    section.models.find((model) => model.name === name)
  );
  const model = section.models.find((model) => model.name === name);

  const data = useListData<Model>(name);
  const count = useListCount(name);

  const getButtons = () => {
    return [
      model.create && { label: "Create new", href: `/${name}s/create` },
      ...buttons,
    ];
  };

  return (
    <>
      <span className={styles.breadcrumb}>
        {section.name} / {model.label}
      </span>
      <h1 className={styles.title}>
        List
        <span className={styles.count}>{count}</span>
      </h1>
      <div className={styles.actions}>
        {model.searchField != null && <SearchBar field={model.searchField} />}
        <ButtonGroup buttons={getButtons()} />
      </div>
      <div className={styles.body}>
        <Table
          modelName={model.name}
          data={data}
          count={count}
          fields={fields}
          delete={model.delete}
          detail={model.detail}
        />
        {filters && <Filter filters={filters} />}
      </div>
    </>
  );
}
