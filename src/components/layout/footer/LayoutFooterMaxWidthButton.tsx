"use client";

import { FC } from "react";

import Button, { ButtonProps } from "@src/components/button/Button";

import LayoutFooterContainer, {
  LayoutFooterContainerProps,
} from "./_components/LayoutFooterContainer";

import STYLE from "./layout.footer.module.scss";

type LayoutFooterMaxWidthButtonProps = LayoutFooterContainerProps &
  Omit<ButtonProps, "width" | "height">;

const LayoutFooterMaxWidthButton: FC<LayoutFooterMaxWidthButtonProps> = ({
  children,
  disabledShadow = true,
  backgroundColor = "transparent",
  ...rest
}) => (
  <LayoutFooterContainer
    disabledShadow={disabledShadow}
    backgroundColor={backgroundColor}
  >
    <div className={STYLE.__footer_max_width_button_wrapper}>
      <Button width="calc(100vw - 24px)" {...rest}>
        {children}
      </Button>
    </div>
  </LayoutFooterContainer>
);

export default LayoutFooterMaxWidthButton;
