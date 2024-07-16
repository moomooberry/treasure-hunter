"use client";

import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

import { LAYOUT_FOOTER_HEIGHT } from "@src/constants/layout";
import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";

import STYLE from "../layout.footer.module.scss";

export interface LayoutFooterContainerProps extends PropsWithChildren {
  disabledShadow?: boolean;
  backgroundColor?: string;
}

const LayoutFooterContainer: FC<LayoutFooterContainerProps> = ({
  children,
  disabledShadow = false,
  backgroundColor = "#fff",
}) => {
  const {
    device: { bottom: paddingBottom },
  } = useZustandDeviceStore();

  return (
    <footer
      className={classNames({
        [STYLE.__footer_container]: true,
        [STYLE.__footer_container_box_shadow]: !disabledShadow,
      })}
      style={{
        backgroundColor,
        paddingBottom,
        height: LAYOUT_FOOTER_HEIGHT,
      }}
    >
      {children}
    </footer>
  );
};

export default LayoutFooterContainer;
