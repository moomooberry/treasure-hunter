"use client";

import { FC, MouseEventHandler, PropsWithChildren } from "react";

import STYLE from "../layout.header.module.scss";

interface LayoutHeaderRoundButtonProps extends PropsWithChildren {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const LayoutHeaderRoundButton: FC<LayoutHeaderRoundButtonProps> = ({
  onClick,
  children,
}) => (
  <button className={STYLE.__header_option_round_button} onClick={onClick}>
    {children}
  </button>
);

export default LayoutHeaderRoundButton;
