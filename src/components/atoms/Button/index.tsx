import { PropsWithChildren } from "react";

import styles from "./index.module.scss";

type ButtonType = "primary" | "danger" | "secondary";

export function Button({
  width,
  type = "primary",
  children,
  bold,
  onClick,
}: PropsWithChildren<{
  width?: string;
  /** @default 'primary' */
  type?: ButtonType;
  bold?: boolean;
  onClick?: () => void;
}>) {
  return (
    <button
      className={styles.wrapper}
      data-type={type}
      style={{ width: width ?? "fit-content", fontWeight: bold ? 700 : 400 }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
