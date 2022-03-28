import Link from "next/link";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import styles from "./index.module.scss";

export type ButtonType = "primary" | "danger" | "secondary";

export type ButtonProps = PropsWithChildren<{
  width?: string;
  /** @default 'primary' */
  type?: ButtonType;
  /** @default true */
  bold?: boolean;
  onClick?: () => void;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}>;

export function Button({
  width,
  type = "primary",
  children,
  bold = true,
  onClick,
  htmlType,
}: ButtonProps) {
  return (
    <button
      className={styles.wrapper}
      data-type={type}
      type={htmlType}
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
