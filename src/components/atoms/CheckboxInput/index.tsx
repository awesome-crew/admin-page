import { ChangeEventHandler } from "react";

import styles from "./index.module.scss";

export type CheckboxInputProps = {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: boolean;
};

export function CheckboxInput(props: CheckboxInputProps) {
  return (
    <label className={styles.wrapper}>
      <input
        className={styles.checkbox}
        type="checkbox"
        name={props.name}
        onChange={props.onChange}
        checked={props.value}
      />
      {props.name}
    </label>
  );
}
