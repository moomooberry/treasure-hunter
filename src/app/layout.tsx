import type { Metadata } from "next";

import StoreProvider from "./StoreProvider";
import PositionProvider from "./PositionProvider";
import QueryProvider from "./QueryProvider";

import "@src/styles/global.css";
import "@src/styles/reset.css";
import "@src/styles/skeleton.scss";

export const metadata: Metadata = {
  title: "treasure-hunter",
  description: "find treasures and get rewards!",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <StoreProvider>
      <html lang="ko">
        <body>
          <QueryProvider>
            <PositionProvider>{children}</PositionProvider>
          </QueryProvider>
        </body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
