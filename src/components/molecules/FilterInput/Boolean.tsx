import styles from "./index.module.scss";

import { FilterInputProps } from "./type";

const BOOLEAN_FILTER_ITEMS = [
  { label: "상관없음", value: null },
  { label: "네", value: true },
  { label: "아니오", value: false },
];

export default function BooleanFilterInput({
  name,
  value,
  onChange,
}: FilterInputProps<boolean>) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.name}>{name}</p>
      {BOOLEAN_FILTER_ITEMS.map((item) => (
        <p
          key={item.label}
          className={styles.item}
          onClick={() => onChange(item.value)}
          data-selected={value === item.value}
        >
          {item.label}
        </p>
      ))}
    </div>
  );
}
