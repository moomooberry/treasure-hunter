"use client";

import { FC, useCallback, useEffect, useRef } from "react";
import { TreasureMap } from "@src/libs/google-map";
import { TreasureItem } from "@src/types/treasure";

const data: TreasureItem = {
  id: 1,
  position: { lat: 37.4762182, lng: 126.9804634 },
  endDate: 123,
  hint: "힌트입니다.",
  imgSrc: ["asd"],
  reward: 10000,
  title: "타이틀입니다",
};

const MapEdit: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const init = useCallback(async () => {
    if (!ref.current) return;

    const map = new TreasureMap(ref.current);

    await map.init({ mode: "edit", position: data.position });

    map.loadTreasure({ data });
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div
      ref={ref}
      style={{
        width: "100vw",
        height: "30vh",
      }}
    />
  );
};

export default MapEdit;
