"use client";

import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

import { LAYOUT_HEADER_HEIGHT } from "@src/constants/layout";
import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";

import STYLE from "../layout.header.module.scss";

export interface LayoutHeaderContainerProps extends PropsWithChildren {
  backgroundColor?: string;
  shadowDisabled?: boolean;
}

const LayoutHeaderContainer: FC<LayoutHeaderContainerProps> = ({
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

export default LayoutHeaderContainer;
