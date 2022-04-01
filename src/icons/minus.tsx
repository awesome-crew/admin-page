import { palette } from "@/constants";

import { IconProps } from "./icon";

export function MinusIcon(props: IconProps) {
  return (
    <svg
      width="14"
      height="2"
      viewBox="0 0 14 2"
      fill={palette.black}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14 2H0V0H14V2Z" />
    </svg>
  );
}
