import { FC } from "react";

const ThunderIcon: FC<IconProps> = ({
  width = "24px",
  height = "24px",
  color = "#000",
}) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 512 512"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      fill={color}
      stroke="none"
    >
      <path
        d="M2426 5099 c-19 -15 -216 -398 -672 -1310 -354 -709 -644 -1298 -644
-1309 0 -32 21 -67 47 -79 16 -8 164 -11 470 -11 352 0 444 -3 440 -12 -2 -7
-219 -522 -481 -1144 -262 -622 -476 -1141 -476 -1153 0 -30 52 -81 82 -81 13
0 34 7 46 16 21 14 2714 3205 2755 3264 24 35 21 76 -8 105 l-24 25 -522 0
c-413 0 -520 3 -516 13 2 6 223 356 489 777 267 421 490 775 496 787 20 36 14
82 -13 108 l-24 25 -709 0 c-708 0 -709 0 -736 -21z"
      />
    </g>
  </svg>
);

export default ThunderIcon;
