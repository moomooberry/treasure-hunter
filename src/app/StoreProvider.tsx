"use client";

import { AppStore, makeStore } from "@src/libs/redux";
import { FC, PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
