import styles from "./index.module.scss";

export type BooleanFilterProps = {
  name: string;
  value: "true" | "false" | "null";
  onChange: (filterName: string, filterValue: string) => void;
};

const BOOLEAN_FILTER_ITEMS = [
  { label: "All", value: "null" },
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

export function BooleanFilter({ name, value, onChange }: BooleanFilterProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.name}>{name}</p>
      {BOOLEAN_FILTER_ITEMS.map((item) => (
        <p
          key={item.label}
          className={styles.item}
          onClick={() => onChange(name, item.value)}
          data-selected={value === item.value}
        >
          {item.label}
        </p>
      ))}
    </div>
  );
}
