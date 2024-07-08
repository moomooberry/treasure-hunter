import { Device } from "@src/types/device";
import { createStore } from "zustand";

export interface ZustandDevice {
  device: Device;
  setDevice: (value: Device) => void;
}

export const zustandDeviceInitialState: ZustandDevice["device"] = {
  top: "0",
  bottom: "0",
  os: "WEB",
};

export const createZustandDevice = (
  initState: ZustandDevice["device"] = zustandDeviceInitialState
) =>
  createStore<ZustandDevice>((set) => ({
    device: initState,
    setDevice: (device: Device) => set({ device }),
  }));
