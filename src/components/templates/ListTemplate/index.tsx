import SearchBar from "./SearchBar";
import Table, { ListTableProps } from "./Table";
import Filter, { ListFilterProps } from "./Filter";
import { Badge, ButtonGroup, ButtonGroupProps, Seo } from "@/components/atoms";

import { useListCount } from "./useListCount";
import { useListData } from "./useListData";

import { findModel, findSection } from "@/helpers";

import styles from "./index.module.scss";

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
  const section = findSection(name);
  const model = findModel(name);

  const data = useListData<Model>(name);
  const count = useListCount(name);

  const getButtons = () => {
    return [
      model.create && { label: "추가하기", href: `/${name}s/create` },
      ...(buttons ?? []),
    ];
  };

  return (
    <>
      <Seo title={model.label} />
      <span className={styles.breadcrumb}>
        {section.name} / {model.label}
      </span>
      <h1 className={styles.title}>
        {model.label}
        <Badge className={styles.count} type="highlight">
          {count}
        </Badge>
      </h1>
      {model.description != null && (
        <p className={styles.description}>{model.description}</p>
      )}
      <div className={styles.actions}>
        {model.searchFieldName != null && (
          <SearchBar
            field={model.searchFieldName}
            label={model.searchFieldLabel}
          />
        )}
        <ButtonGroup buttons={getButtons()} />
      </div>
      <div className={styles.body}>
        <Table
          modelName={model.name}
          data={data}
          count={count}
          fields={fields}
        />
        {filters && <Filter filters={filters} />}
      </div>
    </>
  );
}
