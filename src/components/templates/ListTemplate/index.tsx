import Link from "next/link";

import { Button } from "@/components/atoms";
import SearchBar from "./SearchBar";
import Buttons, { ListButtonsProps } from "./Buttons";
import Table, { ListTableProps } from "./Table";

import { useListCount } from "./useListCount";
import { useListData } from "./useListData";

import styles from "./index.module.scss";

import config from "~/admin.config.json";

export type ListTemplateProps<Model> = {
  name: string;
} & Pick<ListButtonsProps, "buttons"> &
  Pick<ListTableProps<Model>, "fields">;

export function ListTemplate<Model>({
  name,
  buttons,
  fields,
}: ListTemplateProps<Model>) {
  const section = config.sections.find((section) =>
    section.models.find((model) => model.name === name)
  );
  const model = section.models.find((model) => model.name === name);

  const data = useListData<Model>(name);
  const count = useListCount(name);

  return (
    <>
      <span className={styles.breadcrumb}>
        {section.name} / {model.label}
      </span>
      <h1 className={styles.title}>List</h1>
      <div className={styles.actions}>
        {model.searchField != null && <SearchBar field={model.searchField} />}
        <Buttons buttons={buttons}>
          {model.create === true && (
            <Link href={`/${name}s/create`}>
              <a>
                <Button>Create new</Button>
              </a>
            </Link>
          )}
        </Buttons>
      </div>
      <Table
        modelName={model.name}
        data={data}
        count={count}
        fields={fields}
        delete={model.delete}
        detail={model.detail}
      />
    </>
  );
}
