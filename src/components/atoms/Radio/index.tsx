import { ChangeEvent } from "react";

import styles from "./index.module.scss";

export type RadioProps<Value> = {
  name: string;
  value: Value;
  label: string;
  defaultChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Radio<Value>({
  name,
  label,
  value,
  defaultChecked,
  onChange,
}: RadioProps<Value>) {
  return (
    <label className={styles.wrapper}>
      <input
        type="radio"
        name={name}
        className={styles.radio}
        value={value as any}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
