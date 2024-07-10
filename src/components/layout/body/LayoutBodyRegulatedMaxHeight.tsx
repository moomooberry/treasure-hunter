"use client";

import { FC } from "react";

import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";
import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";

import LayoutBodyContainer, {
  LayoutBodyContainerProps,
} from "./_components/LayoutBodyContainer";

const LayoutBodyRegulatedMaxHeight: FC<LayoutBodyContainerProps> = ({
  children,
  marginBottom,
  marginTop,
}) => {
  const {
    device: { top, bottom },
  } = useZustandDeviceStore();

  return (
    <LayoutBodyContainer marginBottom={marginBottom} marginTop={marginTop}>
      <div
        style={{
          height: `calc(100vh - ${`${
            marginTop ?? `calc(${top} + ${LAYOUT_HEADER_HEIGHT})`
          }`} - ${
            marginBottom ?? `calc(${bottom} + ${LAYOUT_FOOTER_HEIGHT})`
          })`,
        }}
      >
        {children}
      </div>
    </LayoutBodyContainer>
  );
};

export default LayoutBodyRegulatedMaxHeight;
