import type { Metadata } from "next";

import "@src/styles/global.css";
import "@src/styles/reset.css";
import StoreProvider from "./StoreProvider";
import PositionController from "./PositionController";

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
          <PositionController>{children}</PositionController>
        </body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
