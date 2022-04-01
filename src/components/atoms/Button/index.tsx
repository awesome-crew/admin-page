import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  useMemo,
  useState,
  MouseEvent,
  useRef,
} from "react";
import Link from "next/link";
import cn from "classnames";

import Drip from "./Drip";

import { palette } from "@/constants";

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
    /** @default true */
    showDrip?: boolean;
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
  showDrip = true,
  onClick,
  ...buttonProps
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [dripShow, setDripShow] = useState<boolean>(false);
  const [dripX, setDripX] = useState<number>(0);
  const [dripY, setDripY] = useState<number>(0);

  const [backgroundColor, color, dripColor] = useMemo(
    () =>
      ({
        primary: [palette.black, palette.white, "#bbb"],
        danger: [palette.red, palette.white, "#ff9fb4"],
        secondary: [palette.gray8, palette.black, palette.gray7],
      }[type]),
    [type]
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (showDrip && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDripShow(true);
      setDripX(e.clientX - rect.left);
      setDripY(e.clientY - rect.top);
    }

    onClick && onClick(e);
  };
  const handleDripComplete = () => {
    setDripShow(false);
    setDripX(0);
    setDripY(0);
  };

  return (
    <button
      ref={buttonRef}
      type={htmlType}
      {...buttonProps}
      className={cn(styles.wrapper, className)}
      onClick={handleClick}
      style={{
        width: width ?? "fit-content",
        fontWeight: bold ? 700 : 400,
        backgroundColor,
        color,
        ...style,
      }}
    >
      {children}
      {dripShow && (
        <Drip
          x={dripX}
          y={dripY}
          color={dripColor}
          onCompleted={handleDripComplete}
        />
      )}
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
