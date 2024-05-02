"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { TreasureMap } from "@src/libs/google-map";
import { Position } from "@src/types/position";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";

const MapAdd: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const initialPosition = useReduxSelector(
    (state) => state.reduxPosition.position
  );

  const [treasureMap, setTreasureMap] = useState<TreasureMap | null>(null);

  const [position, setPosition] = useState<Position | null>(null);

  const [error, setError] = useState<TreasureMap["_error"]>({
    isOverBuffer: false,
  });

  const init = useCallback(async () => {
    if (!ref.current) return;

    const map = new TreasureMap(ref.current);

    const onError = (error: TreasureMap["_error"]) => {
      setError(error);
    };

    const onPosition = (position: Position) => {
      setPosition(position);
    };

    await map.init({
      mode: "add",
      position: initialPosition,
      bufferRadius: 30,
    });

    map.generateTreasure({ position: initialPosition, onError, onPosition });

    setTreasureMap(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!treasureMap) return;
    if (error.isOverBuffer) alert("범위를 벗어났어요");
  }, [treasureMap, error]);

  useEffect(() => {
    if (!treasureMap) return;
    console.log("position", position);
  }, [treasureMap, position]);

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
