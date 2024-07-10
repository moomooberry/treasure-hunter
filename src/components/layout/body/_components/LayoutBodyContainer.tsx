"use client";

import { FC, PropsWithChildren } from "react";

import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";
import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";

export interface LayoutBodyContainerProps extends PropsWithChildren {
  marginTop?: string;
  marginBottom?: string;
}

const LayoutBodyContainer: FC<LayoutBodyContainerProps> = ({
  children,
  marginTop,
  marginBottom,
}) => {
  const {
    device: { top, bottom },
  } = useZustandDeviceStore();

  return (
    <div
      style={{
        marginTop: marginTop ?? `calc(${LAYOUT_HEADER_HEIGHT} + ${top})`,
        marginBottom:
          marginBottom ?? `calc(${LAYOUT_FOOTER_HEIGHT} + ${bottom})`,
      }}
    >
      {children}
    </div>
  );
};

export default LayoutBodyContainer;
