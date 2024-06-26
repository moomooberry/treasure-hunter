"use client";

import { FC } from "react";

import Button, { ButtonProps } from "@src/components/button";

import LayoutFooter, { LayoutFooterProps } from ".";

import STYLE from "./layout.footer.module.scss";

type LayoutFooterMaxWidthButtonProps = LayoutFooterProps &
  Omit<ButtonProps, "width" | "height">;

const LayoutFooterMaxWidthButton: FC<LayoutFooterMaxWidthButtonProps> = ({
  children,
  disabledShadow = true,
  backgroundColor = "transparent",
  ...rest
}) => (
  <LayoutFooter
    disabledShadow={disabledShadow}
    backgroundColor={backgroundColor}
  >
    <div className={STYLE.__footer_max_width_button_wrapper}>
      <Button width="calc(100vw - 24px)" {...rest}>
        {children}
      </Button>
    </div>
  </LayoutFooter>
);

export default LayoutFooterMaxWidthButton;
