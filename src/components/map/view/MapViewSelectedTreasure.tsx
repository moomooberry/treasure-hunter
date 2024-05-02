"use client";

import { FC, useCallback } from "react";
import { TreasureItem } from "@src/types/treasure";
import { useRouter } from "next/navigation";

interface MapSelectedTreasureProps {
  item: TreasureItem;
}

const MapSelectedTreasure: FC<MapSelectedTreasureProps> = ({ item }) => {
  const { push } = useRouter();

  const onClick = useCallback(
    (id: number) => {
      const handler = () => {
        push(`/treasure/${id}`);
      };
      return handler;
    },
    [push]
  );

  return (
    <div
      style={{
        position: "fixed",
        left: "20px",
        bottom: "80px",
        width: "calc(100vw - 40px)",
        height: "300px",
        borderRadius: "20px",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
      onClick={onClick(item.id)}
    >
      {item.id}
    </div>
  );
};

export default MapSelectedTreasure;
