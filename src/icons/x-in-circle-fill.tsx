import { palette } from "@/constants";

import { IconProps } from "./icon";

export function XInCircleFillIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill={props.fill ?? palette.black} />
      <path d="M15 9l-6 6" stroke={palette.white} />
      <path d="M9 9l6 6" stroke={palette.white} />
    </svg>
  );
}
