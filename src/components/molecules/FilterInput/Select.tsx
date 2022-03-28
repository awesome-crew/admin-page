import { FilterInputProps } from "./type";

import styles from "./index.module.scss";

export type SelectFilterInputProps<Value> = FilterInputProps<Value> & {
  options: Array<{ label: string; value: Value }>;
};
export default function SelectFilterInput<Value>({
  label,
  value,
  onChange,
  options,
}: SelectFilterInputProps<Value>) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.name}>{label}</p>
      {[{ label: "상관없음", value: null }, ...options].map((option) => (
        <p
          key={option.label}
          className={styles.item}
          onClick={() => onChange(option.value)}
          data-selected={value === option.value}
        >
          {option.label}
        </p>
      ))}
    </div>
  );
}

export function BooleanFilterInput(props: FilterInputProps<boolean>) {
  return (
    <SelectFilterInput
      {...props}
      options={[
        { label: "네", value: true },
        { label: "아니오", value: false },
      ]}
    />
  );
}
