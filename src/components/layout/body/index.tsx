"use client";

import { FC, PropsWithChildren } from "react";

import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";
import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";

import LayoutBodyCommon from "./LayoutBodyCommon";
import LayoutBodyRegulatedMaxHeight from "./LayoutBodyRegulatedMaxHeight";

export interface LayoutBodyProps extends PropsWithChildren {
  marginTop?: string;
  marginBottom?: string;
}

interface LayoutBodyComponent extends FC<LayoutBodyProps> {
  Common: typeof LayoutBodyCommon;
  RegulatedMaxHeight: typeof LayoutBodyRegulatedMaxHeight;
}

const LayoutBody: LayoutBodyComponent = ({
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

export default LayoutBody;

LayoutBody.Common = LayoutBodyCommon;
LayoutBody.RegulatedMaxHeight = LayoutBodyRegulatedMaxHeight;
