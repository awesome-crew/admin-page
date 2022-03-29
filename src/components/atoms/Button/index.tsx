import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import Link from "next/link";
import cn from "classnames";

import styles from "./index.module.scss";

export type ButtonType = "primary" | "danger" | "secondary";

export type ButtonProps = PropsWithChildren<
  {
    width?: string;
    /** @default 'primary' */
    type?: ButtonType;
    /** @default true */
    bold?: boolean;
    htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  } & Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "className" | "style"
  >
>;

export function Button({
  width,
  type = "primary",
  children,
  bold = true,
  htmlType,
  className,
  style,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      data-type={type}
      type={htmlType}
      {...buttonProps}
      className={cn(styles.wrapper, className)}
      style={{
        width: width ?? "fit-content",
        fontWeight: bold ? 700 : 400,
        ...style,
      }}
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
