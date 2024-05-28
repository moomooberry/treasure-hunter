import { FC } from "react";

const HeartIcon: FC<IconProps> = ({
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
        d="M1382 4486 c-244 -47 -452 -155 -622 -326 -275 -274 -411 -658 -380
-1068 25 -329 148 -611 411 -944 116 -146 442 -468 724 -713 508 -443 907
-781 943 -797 51 -24 155 -23 207 1 39 18 776 646 1105 941 209 187 463 445
566 575 192 242 310 468 370 709 35 140 45 414 20 567 -68 409 -319 768 -659
940 -186 94 -373 134 -587 125 -153 -6 -232 -21 -360 -69 -179 -68 -365 -207
-495 -370 l-68 -85 -57 71 c-167 211 -390 361 -628 424 -80 21 -125 26 -257
29 -107 2 -184 -1 -233 -10z"
      />
    </g>
  </svg>
);

export default HeartIcon;
