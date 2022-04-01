import { CSSProperties, SVGAttributes } from "react";

export type IconProps = Pick<
  SVGAttributes<HTMLOrSVGElement>,
  "className" | "style" | "onClick" | "fill" | "width" | "height"
>;
