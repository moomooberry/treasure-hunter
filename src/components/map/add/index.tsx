"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { TreasureMap } from "@src/libs/google-map";
import { Position } from "@src/types/position";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";

interface MapAddProps {
  onPosition: (value: Position) => void;
  onError: (value: TreasureMap["_error"]) => void;
}

const MapAdd: FC<MapAddProps> = ({ onError, onPosition }) => {
  const ref = useRef<HTMLDivElement>(null);

  const position = useReduxSelector((state) => state.reduxPosition.position);

  const init = useCallback(async () => {
    if (!ref.current) return;

    const map = new TreasureMap(ref.current);

    await map.init({
      mode: "add",
      position,
      bufferRadius: 30,
    });

    map.generateTreasure({ position, onError, onPosition });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onError, onPosition]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div
      ref={ref}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

export default MapAdd;
