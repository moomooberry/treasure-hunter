import type { Metadata } from "next";

import StoreProvider from "./StoreProvider";
import PositionProvider from "./PositionProvider";
import QueryProvider from "./QueryProvider";
import { cookies } from "next/headers";
import {
  DEVICE_SAFE_AREA_TOP_KEY,
  DEVICE_SAFE_AREA_BOTTOM_KEY,
  DEVICE_OS_KEY,
} from "@src/constants/device";
import DeviceProvider from "./DeviceProvider";
import { Device } from "@src/types/device";

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
  const cookieStore = cookies();

  const top = cookieStore.get(DEVICE_SAFE_AREA_TOP_KEY)!.value;
  const bottom = cookieStore.get(DEVICE_SAFE_AREA_BOTTOM_KEY)!.value;
  const os = cookieStore.get(DEVICE_OS_KEY)!.value as Device["os"];

  const device: Device = {
    os,
    bottom: `${bottom}px`,
    top: `${top}px`,
  };

  return (
    <StoreProvider>
      <html lang="ko">
        <body>
          <QueryProvider>
            <PositionProvider>
              <DeviceProvider device={device}>{children}</DeviceProvider>
            </PositionProvider>
          </QueryProvider>
        </body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
