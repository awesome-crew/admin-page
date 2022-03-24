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

export default function ListFilter(props: ListFilterProps) {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Filter</h2>
    </section>
  );
}
