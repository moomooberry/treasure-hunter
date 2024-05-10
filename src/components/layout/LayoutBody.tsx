"use client";

import { FC, PropsWithChildren } from "react";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";

const LayoutBody: FC<PropsWithChildren> = ({ children }) => {
  const { top, bottom } = useReduxSelector((state) => state.reduxDevice.device);

  return (
    <div
      style={{
        marginTop: `calc(${LAYOUT_HEADER_HEIGHT} + ${top})`,
        marginBottom: `calc(${LAYOUT_FOOTER_HEIGHT} + ${bottom})`,
      }}
    >
      {children}
    </div>
  );
};

export default LayoutBody;
