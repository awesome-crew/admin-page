import { palette } from "@/constants";

import { IconProps } from "./icon";

export function CheckInCircleFillIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
        fill={props.fill ?? palette.black}
        stroke={props.fill ?? palette.black}
      />
      <path
        d="M8 11.8571L10.5 14.3572L15.8572 9"
        fill="none"
        stroke={palette.white}
      />
    </svg>
  );
}
