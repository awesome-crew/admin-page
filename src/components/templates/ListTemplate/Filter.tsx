import { FilterInput } from "@/components/molecules";

import { useQuery } from "@/hooks";

import styles from "./Filter.module.scss";

export type FilterType = "boolean" | "string" | "number" | "enum";
export type ListFilterProps = {
  filters: Array<
    | {
        name: string;
        label: string;
        type: "boolean" | "string" | "number";
      }
    | {
        name: string;
        label: string;
        type: "enum";
        enumValues: {
          label: string;
          value: string;
        }[];
      }
  >;
};

export default function ListFilter({ filters }: ListFilterProps) {
  const { query, set } = useQuery();

  const handleChange = (name: string, value: boolean | string | number) => {
    set({
      ...query,
      [name]: value,
      offset: 0,
      limit: 20,
    });
  };

  const renderInputs = () => {
    return filters.map((filter) => {
      switch (filter.type) {
        case "boolean":
          return (
            <FilterInput.Boolean
              label={filter.label}
              value={
                { true: true, false: false }[query[filter.name]?.toString()] ??
                null
              }
              onChange={(v) => handleChange(filter.name, v)}
            />
          );
      }
    });
  };

  if (!query) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Filter</h2>
      {renderInputs()}
    </section>
  );
}
