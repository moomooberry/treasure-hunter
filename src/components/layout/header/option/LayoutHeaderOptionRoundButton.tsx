"use client";

import { FC, MouseEventHandler, PropsWithChildren } from "react";

import STYLE from "./layout.header.option.module.scss";

interface LayoutHeaderOptionRoundButtonProps extends PropsWithChildren {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const LayoutHeaderOptionRoundButton: FC<LayoutHeaderOptionRoundButtonProps> = ({
  onClick,
  children,
}) => (
  <button className={STYLE.__header_option_round_button} onClick={onClick}>
    {children}
  </button>
);

export default LayoutHeaderOptionRoundButton;
