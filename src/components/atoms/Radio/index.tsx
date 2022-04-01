import { ChangeEvent } from "react";

import styles from "./index.module.scss";

export type RadioProps = {
  name: string;
  value: string | number;
  label: string;
  defaultChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Radio({
  name,
  label,
  value,
  defaultChecked,
  onChange,
}: RadioProps) {
  return (
    <label className={styles.wrapper}>
      <input
        type="radio"
        name={name}
        className={styles.radio}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
