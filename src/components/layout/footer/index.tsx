"use client";

import { FC, PropsWithChildren } from "react";
import classNames from "classnames";

import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import { LAYOUT_FOOTER_HEIGHT } from "@src/constants/layout";

import LayoutFooterCommon from "./LayoutFooterCommon";
import LayoutFooterMaxWidthButton from "./LayoutFooterMaxWidthButton";
import LayoutFooterSmallButton from "./LayoutFooterSmallButton";

import STYLE from "./layout.footer.module.scss";

export interface LayoutFooterProps extends PropsWithChildren {
  disabledShadow?: boolean;
  backgroundColor?: string;
}

interface LayoutFooterComponent extends FC<LayoutFooterProps> {
  Common: typeof LayoutFooterCommon;
  MaxWidthButton: typeof LayoutFooterMaxWidthButton;
  SmallButton: typeof LayoutFooterSmallButton;
}

const LayoutFooter: LayoutFooterComponent = ({
  children,
  disabledShadow = false,
  backgroundColor = "#fff",
}) => {
  const paddingBottom = useReduxSelector(
    (state) => state.reduxDevice.device.bottom
  );

  return (
    <div
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
    </div>
  );
};

export default LayoutFooter;

LayoutFooter.Common = LayoutFooterCommon;
LayoutFooter.MaxWidthButton = LayoutFooterMaxWidthButton;
LayoutFooter.SmallButton = LayoutFooterSmallButton;
