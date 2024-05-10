import { FC, PropsWithChildren } from "react";
import LayoutHeader from "./LayoutHeader";
import LayoutBody from "./LayoutBody";
import LayoutFooter from "./LayoutFooter";

interface LayoutComponent extends FC<PropsWithChildren> {
  Header: typeof LayoutHeader;
  Body: typeof LayoutBody;
  Footer: typeof LayoutFooter;
}

const Layout: LayoutComponent = ({ children }) => children;

export default Layout;

Layout.Header = LayoutHeader;
Layout.Body = LayoutBody;
Layout.Footer = LayoutFooter;
