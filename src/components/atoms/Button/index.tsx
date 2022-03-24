import Link from "next/link";
import { PropsWithChildren } from "react";

import styles from "./index.module.scss";

export type ButtonType = "primary" | "danger" | "secondary";

export type ButtonProps = PropsWithChildren<{
  width?: string;
  /** @default 'primary' */
  type?: ButtonType;
  /** @default true */
  bold?: boolean;
  onClick?: () => void;
}>;

export function Button({
  width,
  type = "primary",
  children,
  bold = true,
  onClick,
}: ButtonProps) {
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

Button.Link = function LinkButton(props: ButtonProps & { href: string }) {
  return (
    <Link href={props.href}>
      <a>
        <Button {...props} />
      </a>
    </Link>
  );
};
