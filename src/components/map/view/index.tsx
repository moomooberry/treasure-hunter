"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import { TreasureMap } from "@src/libs/google-map";
import MapSelectedTreasure from "./MapViewSelectedTreasure";
import { TreasureItem } from "@src/types/treasure";

// TODO 보물 List api 현재 위치로부터 distance(3000)순
const data: TreasureItem[] = [
  {
    id: 1,
    lat: 37.4762138 + 0.001,
    lng: 126.9804523 + 0.001,
    endDate: 123,
    hint: "힌트입니다.",
    imgSrc: ["asd"],
    reward: 10000,
    title: "타이틀입니다",
    created_at: "@@asd",
    userId: "@@asd",
  },
  {
    id: 2,
    lat: 37.4762138 - 0.001,
    lng: 126.9804523 - 0.001,
    endDate: 123,
    hint: "힌트입니다.",
    imgSrc: ["asd"],
    reward: 10000,
    title: "타이틀입니다",
    created_at: "@@asd",
    userId: "@@asd",
  },
  {
    id: 3,
    lat: 37.4762138 + 0.0005,
    lng: 126.9804523 - 0.0003,
    endDate: 123,
    hint: "힌트입니다.",
    imgSrc: ["asd"],
    reward: 10000,
    title: "타이틀입니다",
    created_at: "@@asd",
    userId: "@@asd",
  },
];

const MapView: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const position = useReduxSelector((state) => state.reduxPosition.position);

  const [treasureMap, setTreasureMap] = useState<TreasureMap>();

  const [selectedTreasure, setSelectedTreasure] = useState<TreasureItem | null>(
    null
  );

  const init = useCallback(async () => {
    if (!ref.current) return;

    const map = new TreasureMap(ref.current);

    const onSelect = (value: TreasureItem | null) => {
      setSelectedTreasure(value);
    };

    await map.init({
      mode: "view",
      position,
      bufferRadius: 3000,
    });

    await map.loadTreasureList({
      data,
      onSelect,
    });

    setTreasureMap(map);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!treasureMap) return;

    treasureMap.moveUser({ position });
    treasureMap.moveUserBuffer({ position });
  }, [treasureMap, position]);

  console.log("selectedTreasure", selectedTreasure);

  return (
    <>
      <div
        ref={ref}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
      {selectedTreasure && <MapSelectedTreasure item={selectedTreasure} />}
    </>
  );
};

export default MapView;
