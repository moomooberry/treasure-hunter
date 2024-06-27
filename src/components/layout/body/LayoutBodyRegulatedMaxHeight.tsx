"use client";

import { FC } from "react";

import LayoutBody, { LayoutBodyProps } from ".";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";

const LayoutBodyRegulatedMaxHeight: FC<LayoutBodyProps> = ({
  children,
  marginBottom,
  marginTop,
}) => {
  const { top, bottom } = useReduxSelector((state) => state.reduxDevice.device);

  return (
    <LayoutBody marginBottom={marginBottom} marginTop={marginTop}>
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
    </LayoutBody>
  );
};

export default LayoutBodyRegulatedMaxHeight;
