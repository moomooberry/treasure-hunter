"use client";

import { FC } from "react";

import Button, { ButtonProps } from "@src/components/button";

import LayoutFooter, { LayoutFooterProps } from ".";

import STYLE from "./layout.footer.module.scss";

type LayoutFooterSmallButtonProps = LayoutFooterProps &
  Omit<ButtonProps, "width" | "height">;

const LayoutFooterSmallButton: FC<LayoutFooterSmallButtonProps> = ({
  children,
  disabledShadow = true,
  backgroundColor = "transparent",
  ...rest
}) => (
  <LayoutFooter
    disabledShadow={disabledShadow}
    backgroundColor={backgroundColor}
  >
    <div className={STYLE.__footer_small_button_wrapper}>
      <Button width="100px" {...rest}>
        {children}
      </Button>
    </div>
  </LayoutFooter>
);

export default LayoutFooterSmallButton;
