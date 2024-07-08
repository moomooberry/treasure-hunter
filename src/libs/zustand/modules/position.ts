import { Position } from "@src/types/position";
import { createStore } from "zustand";

const LAT_DEFAULT = 37.5642135;
const LNG_DEFAULT = 127.0016985;

export interface ZustandPosition {
  position: Position;
  setPosition: (value: Position) => void;
}

export const zustandPositionInitialState: ZustandPosition["position"] = {
  lat: LAT_DEFAULT,
  lng: LNG_DEFAULT,
};

export const createZustandPosition = (
  initState: ZustandPosition["position"] = zustandPositionInitialState
) =>
  createStore<ZustandPosition>((set) => ({
    position: initState,
    setPosition: (position: Position) => set({ position }),
  }));
