"use client";

import { FC, MouseEventHandler, PropsWithChildren } from "react";

import { LAYOUT_HEADER_HEIGHT } from "@src/constants/layout";

interface LayoutHeaderOptionMaxSizeButtonProps extends PropsWithChildren {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const LayoutHeaderOptionMaxSizeButton: FC<
  LayoutHeaderOptionMaxSizeButtonProps
> = ({ onClick, children }) => (
  <button
    style={{
      width: LAYOUT_HEADER_HEIGHT,
      height: LAYOUT_HEADER_HEIGHT,
    }}
    onClick={onClick}
  >
    {children}
  </button>
);

export default LayoutHeaderOptionMaxSizeButton;
