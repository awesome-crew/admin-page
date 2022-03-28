import { ReactNode } from "react";

import { FieldProps } from "./type";

import styles from "./Base.module.scss";

export type BaseFieldProps<Value> = FieldProps<Value> & {
  children: ReactNode;
};

export function BaseField<Value>({
  name,
  label,
  value,
  children,
}: BaseFieldProps<Value>) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.name}>{label ?? name}</p>
      {children ?? value}
    </div>
  );
}
