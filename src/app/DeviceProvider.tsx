"use client";

import { FC, PropsWithChildren, createContext, useRef } from "react";
import { StoreApi } from "zustand";

import {
  ZustandDevice,
  createZustandDevice,
} from "@src/libs/zustand/modules/device";
import { Device } from "@src/types/device";

export const DeviceStoreContext = createContext<StoreApi<ZustandDevice> | null>(
  null
);

interface DeviceProviderProps extends PropsWithChildren {
  device: Device;
}

const DeviceProvider: FC<DeviceProviderProps> = ({ device, children }) => {
  const value = useRef(createZustandDevice(device)).current;

  return (
    <DeviceStoreContext.Provider value={value}>
      {children}
    </DeviceStoreContext.Provider>
  );
};

export default DeviceProvider;
