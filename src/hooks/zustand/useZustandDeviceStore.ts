"use client";

import { useContext } from "react";
import { useStore } from "zustand";

import { DeviceStoreContext } from "@src/app/DeviceProvider";

const useZustandDeviceStore = () => {
  const context = useContext(DeviceStoreContext);

  if (!context) {
    throw new Error("error occur in useZustandDeviceStore");
  }

  return useStore(context);
};

export default useZustandDeviceStore;
