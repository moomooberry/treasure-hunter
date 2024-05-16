import { FC } from "react";

const TimerIcon: FC<IconProps> = ({
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
        d="M2420 4904 c-491 -41 -898 -192 -1280 -478 -122 -91 -355 -324 -446
-446 -218 -292 -366 -617 -433 -955 -36 -179 -44 -267 -45 -460 0 -269 35
-496 114 -735 115 -350 305 -657 574 -925 383 -381 820 -596 1376 -676 130
-19 451 -16 600 6 526 75 995 314 1365 696 412 426 651 993 658 1562 2 108 -1
127 -20 162 -41 77 -105 115 -193 115 -61 0 -115 -25 -158 -74 -38 -43 -52
-91 -52 -174 0 -248 -77 -564 -195 -805 -104 -214 -225 -378 -403 -548 -277
-265 -599 -428 -992 -501 -93 -18 -154 -22 -320 -22 -339 -1 -585 56 -874 201
-889 446 -1287 1495 -919 2423 277 699 936 1170 1688 1206 149 7 186 16 232
57 68 60 92 162 58 245 -45 105 -142 142 -335 126z"
      />
      <path
        d="M3322 4741 c-163 -41 -217 -259 -91 -365 53 -45 95 -59 166 -54 77 5
135 41 171 108 20 38 23 56 20 112 -3 55 -9 75 -33 110 -49 69 -153 109 -233
89z"
      />
      <path
        d="M4030 4280 c-83 -15 -151 -79 -170 -161 -35 -145 96 -287 244 -265
53 8 98 37 140 89 26 32 31 48 34 106 3 50 0 77 -13 102 -47 94 -141 145 -235
129z"
      />
      <path
        d="M2460 4028 c-25 -14 -58 -44 -75 -67 l-30 -43 -3 -705 c-2 -696 -2
-706 18 -749 12 -23 36 -54 53 -67 18 -14 233 -125 477 -247 502 -251 505
-252 604 -207 137 63 165 242 53 343 -29 27 -162 98 -415 224 l-372 185 0 601
0 601 -23 44 c-36 68 -93 103 -175 107 -56 3 -74 0 -112 -20z"
      />
      <path
        d="M4429 3567 c-127 -67 -148 -252 -40 -350 154 -139 396 -1 351 200
-32 144 -184 217 -311 150z"
      />
    </g>
  </svg>
);

export default TimerIcon;