"use client";

import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

import { LAYOUT_HEADER_HEIGHT } from "@src/constants/layout";
import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";

import LayoutHeaderCommon from "./LayoutHeaderCommon";
import LayoutHeaderOptionMaxSizeButton from "./option/LayoutHeaderOptionMaxSizeButton";
import LayoutHeaderOptionRoundButton from "./option/LayoutHeaderOptionRoundButton";

import STYLE from "./layout.header.module.scss";

export interface LayoutHeaderProps extends PropsWithChildren {
  backgroundColor?: string;
  shadowDisabled?: boolean;
}

interface LayoutHeaderComponent extends FC<LayoutHeaderProps> {
  Common: typeof LayoutHeaderCommon;
  Option: {
    MaxSizeButton: typeof LayoutHeaderOptionMaxSizeButton;
    RoundButton: typeof LayoutHeaderOptionRoundButton;
  };
}

const LayoutHeader: LayoutHeaderComponent = ({
  children,
  backgroundColor = "#fff",
  shadowDisabled = false,
}) => {
  const {
    device: { top: paddingTop },
  } = useZustandDeviceStore();

  return (
    <header
      className={classNames({
        [STYLE.__header_container]: true,
        [STYLE.__header_container_box_shadow]: !shadowDisabled,
      })}
      style={{
        backgroundColor,
        paddingTop,
        height: LAYOUT_HEADER_HEIGHT,
      }}
    >
      {children}
    </header>
  );
};

export default LayoutHeader;

LayoutHeader.Common = LayoutHeaderCommon;

LayoutHeader.Option = {} as LayoutHeaderComponent["Option"];
LayoutHeader.Option.MaxSizeButton = LayoutHeaderOptionMaxSizeButton;
LayoutHeader.Option.RoundButton = LayoutHeaderOptionRoundButton;
