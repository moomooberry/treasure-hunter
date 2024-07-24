"use client";

import { FC } from "react";

import Button from "@src/components/button/Button";
import { ButtonProps } from "@src/components/button/Button";

import LayoutFooterContainer, {
  LayoutFooterContainerProps,
} from "../_components/LayoutFooterContainer";

import STYLE from "./layout.footer.small.button.module.scss";

type LayoutFooterSmallButtonProps = LayoutFooterContainerProps &
  Omit<ButtonProps, "width" | "height">;

const LayoutFooterSmallButton: FC<LayoutFooterSmallButtonProps> = ({
  children,
  disabledShadow = true,
  backgroundColor = "transparent",
  ...rest
}) => (
  <LayoutFooterContainer
    disabledShadow={disabledShadow}
    backgroundColor={backgroundColor}
  >
    <div className={STYLE.__footer_small_button_wrapper}>
      <Button width="100px" {...rest}>
        {children}
      </Button>
    </div>
  </LayoutFooterContainer>
);

export default LayoutFooterSmallButton;
