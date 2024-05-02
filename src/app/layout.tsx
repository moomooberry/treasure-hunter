import type { Metadata } from "next";

import "@src/styles/global.css";
import "@src/styles/reset.css";
import StoreProvider from "./StoreProvider";
import PositionProvider from "./PositionProvider";

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
          <PositionProvider>{children}</PositionProvider>
        </body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
