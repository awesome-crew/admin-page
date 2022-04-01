import { ChangeEvent } from "react";

import styles from "./index.module.scss";

export type RadioGroupProps = {
  name: string;
  value: string | number | boolean;
  radioValues: Array<{ label: string; value: string | number | boolean }>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function RadioGroup({
  radioValues,
  name,
  value,
  onChange,
}: RadioGroupProps) {
  return (
    <>
      {radioValues.map((v: any) => (
        <label key={v.value} className={styles.wrapper}>
          <input
            type="radio"
            name={name}
            className={styles.radio}
            value={v.value.toString()}
            defaultChecked={value === v.value}
            onChange={onChange}
          />
          {v.label}
        </label>
      ))}
    </>
  );
}
