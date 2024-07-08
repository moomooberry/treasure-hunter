"use client";

import { FC, PropsWithChildren, createContext, useEffect, useRef } from "react";
import { StoreApi } from "zustand";

import {
  ZustandPosition,
  createZustandPosition,
} from "@src/libs/zustand/modules/position";
import useZustandPositionStore from "@src/hooks/zustand/useZustandPositionStore";

export const PositionStoreContext =
  createContext<StoreApi<ZustandPosition> | null>(null);

const PositionController: FC<PropsWithChildren> = ({ children }) => {
  const { setPosition } = useZustandPositionStore();

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        const position = { lat: latitude, lng: longitude };
        setPosition(position);
      },
      (e) => {
        // TODO bridge로 권한 받기
        console.error("error form PositionController", e);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, [setPosition]);

  return children;
};

const PositionProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useRef(createZustandPosition()).current;

  return (
    <PositionStoreContext.Provider value={value}>
      <PositionController>{children}</PositionController>
    </PositionStoreContext.Provider>
  );
};

export default PositionProvider;
