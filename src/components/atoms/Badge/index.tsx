import { CSSProperties, ReactNode, useMemo } from "react";
import cn from "classnames";

import styles from "./index.module.scss";
import { palette } from "@/constants";

export type BadgeType = "primary" | "secondary" | "highlight" | "code";

export type BadgeProps = {
  /** @default 'primary' */
  type?: BadgeType;

  children: ReactNode;

  className?: string;
  style?: CSSProperties;
};

export function Badge({
  type = "primary",
  className,
  style,
  ...spanProps
}: BadgeProps) {
  const [backgroundColor, color, borderColor] = useMemo(
    () => getBadgeColors(type),
    [type]
  );

  return (
    <span
      className={cn(styles.wrapper, className)}
      style={{
        backgroundColor,
        color,
        borderColor,
      }}
      {...spanProps}
    />
  );
}

/** @returns [backgroundColor, color, borderColor] */
const getBadgeColors = (type: BadgeType) => {
  return {
    primary: [palette.black, palette.white, palette.black],
    secondary: [palette.gray5, palette.white, palette.gray5],
    highlight: [palette.blue, palette.white, palette.blue],
    code: [palette.gray8, palette.purple, palette.gray7],
  }[type];
};
