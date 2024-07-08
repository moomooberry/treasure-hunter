"use client";

import { useContext } from "react";
import { useStore } from "zustand";

import { PositionStoreContext } from "@src/app/PositionProvider";

const useZustandPositionStore = () => {
  const context = useContext(PositionStoreContext);

  if (!context) {
    throw new Error("error occur in useZustandPositionStore");
  }

  return useStore(context);
};

export default useZustandPositionStore;
