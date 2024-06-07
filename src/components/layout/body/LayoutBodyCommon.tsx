"use client";

import { FC } from "react";

import LayoutBody, { LayoutBodyProps } from ".";

interface LayoutBodyCommonProps extends LayoutBodyProps {
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
  <LayoutBody marginTop={marginTop} marginBottom={marginBottom}>
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
  </LayoutBody>
);

export default LayoutBodyCommon;
