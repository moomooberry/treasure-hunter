import { FC, PropsWithChildren } from "react";
import LayoutHeader from "./header";
import LayoutFooter from "./footer";

interface LayoutComponent extends FC<PropsWithChildren> {
  Header: typeof LayoutHeader;
  Footer: typeof LayoutFooter;
}

const Layout: LayoutComponent = ({ children }) => (
  <div
    style={{
      margin: "48px 0 60px 0",
      backgroundColor: "gray",
    }}
  >
    {children}
  </div>
);

export default Layout;

Layout.Header = LayoutHeader;
Layout.Footer = LayoutFooter;
