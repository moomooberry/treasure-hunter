import { FC } from "react";

const CaretIcon: FC<IconProps> = ({
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
        d="M3665 5101 c-58 -28 -2449 -2422 -2470 -2473 -20 -50 -19 -94 6 -148
29 -66 2381 -2419 2453 -2455 63 -32 109 -32 174 1 83 41 120 123 100 219 -10
50 -21 61 -1141 1183 l-1132 1132 1132 1133 c925 926 1133 1139 1143 1171 16
49 7 118 -21 163 -49 79 -163 114 -244 74z"
      />
    </g>
  </svg>
);

export default CaretIcon;
