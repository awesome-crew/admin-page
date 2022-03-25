import { ChangeEvent, useEffect, useState } from "react";

import { CheckboxInput } from "@/components/atoms";

import styles from "./Filter.module.scss";

export type FilterType = "boolean" | "string" | "number" | "enum";
export type ListFilterProps = {
  filters: Array<
    | {
        name: string;
        type: "boolean" | "string" | "number";
      }
    | {
        name: string;
        type: "enum";
        enumValues: {
          label: string;
          value: string;
        }[];
      }
  >;
};

export default function ListFilter({ filters }: ListFilterProps) {
  const [filterValues, setFilterValues] =
    useState<{ [name in string]?: boolean | string | number }>();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const filterValues = filters.reduce((acc, filter) => {
      switch (filter.type) {
        case "boolean":
          return {
            ...acc,
            [filter.name]: urlParams.get(filter.name) === "true",
          };
      }

      return acc;
    }, {});

    setFilterValues(filterValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const urlParams = new URLSearchParams(location.search);
    const filter = filters.find(({ name }) => name === e.target.name);
    switch (filter.type) {
      case "boolean":
        e.target.checked
          ? urlParams.set(filter.name, "true")
          : urlParams.delete(filter.name);
    }

    urlParams.set("offset", "0");
    urlParams.set("limit", "20");

    location.search = urlParams.toString();
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Filter</h2>
      {filterValues &&
        filters.map((filter) => {
          switch (filter.type) {
            case "boolean":
              return (
                <CheckboxInput
                  name={filter.name}
                  value={filterValues[filter.name] as boolean}
                  onChange={handleChange}
                />
              );
          }
        })}
    </section>
  );
}
