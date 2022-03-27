import { useEffect, useState } from "react";

import { BooleanFilter } from "@/components/atoms";

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
    useState<{ [name in string]?: any }>();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const filterValues = filters.reduce((acc, filter) => {
      switch (filter.type) {
        case "boolean":
          return {
            ...acc,
            [filter.name]: urlParams.get(filter.name) ?? "null",
          };
      }

      return acc;
    }, {});

    setFilterValues(filterValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (filterName: string, filterValue: string) => {
    const urlParams = new URLSearchParams(location.search);
    const filter = filters.find((filter) => filter.name === filterName);
    switch (filter.type) {
      case "boolean":
        if (filterValue === "null") {
          urlParams.delete(filter.name);
          break;
        }
        urlParams.set(filter.name, filterValue);
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
                <BooleanFilter
                  name={filter.name}
                  value={filterValues[filter.name]}
                  onChange={handleChange}
                />
              );
          }
        })}
    </section>
  );
}
