"use client";

import { FC, PropsWithChildren } from "react";
import LayoutHeader from "./header";
import LayoutFooter from "./footer";
import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";

interface LayoutComponent extends FC<PropsWithChildren> {
  Header: typeof LayoutHeader;
  Footer: typeof LayoutFooter;
}

const Layout: LayoutComponent = ({ children }) => {
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

export default Layout;

Layout.Header = LayoutHeader;
Layout.Footer = LayoutFooter;
