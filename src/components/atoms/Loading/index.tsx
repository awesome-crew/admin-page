import { useMemo } from "react";

import { SpinIcon } from "@/icons";

import { palette } from "@/constants";

import styles from "./index.module.scss";

export type LoadingProps = {
  /** @default 'small' */
  size?: "small" | "medium" | "large";
  /** @default palette.gray5 */
  color?: string;
};
export function Loading({
  size = "small",
  color = palette.gray5,
}: LoadingProps) {
  const [width] = useMemo(
    () =>
      ({
        small: ["12px"],
        medium: ["32px"],
        large: ["56px"],
      }[size]),
    [size]
  );

  return (
    <div className={styles.wrapper}>
      <SpinIcon style={{ width, height: width }} fill={color} />
    </div>
  );
}
