"use client";

import { FC } from "react";

import LayoutBodyContainer, {
  LayoutBodyContainerProps,
} from "./_components/LayoutBodyContainer";

interface LayoutBodyCommonProps extends LayoutBodyContainerProps {
  paddingX?: string;
  paddingY?: string;
}

const LayoutBodyCommon: FC<LayoutBodyCommonProps> = ({
  children,
  marginTop,
  marginBottom,

  paddingX = "12px",
  paddingY = "20px",
}) => (
  <LayoutBodyContainer marginTop={marginTop} marginBottom={marginBottom}>
    <div
      style={{
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
    >
      {children}
    </div>
  </LayoutBodyContainer>
);

export default LayoutBodyCommon;
