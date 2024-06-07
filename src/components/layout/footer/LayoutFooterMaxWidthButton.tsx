"use client";

import { FC } from "react";

import Button, { ButtonProps } from "@src/components/button";

import LayoutFooter, { LayoutFooterProps } from ".";

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
    <Button width="calc(100vw - 24px)" {...rest}>
      {children}
    </Button>
  </LayoutFooter>
);

export default LayoutFooterMaxWidthButton;
