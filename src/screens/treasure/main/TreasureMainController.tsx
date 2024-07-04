"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Position } from "@src/types/position";

import TreasureMainView, { TreasureMainViewProps } from "./TreasureMainView";

interface TreasureMainControllerProps {
  distance: number;
  position: Position;
}

const TreasureMainController: FC<TreasureMainControllerProps> = ({
  distance,
  position,
}) => {
  const { push, prefetch } = useRouter();

  const onTreasureAddClick = () => {
    push("/treasure/add");
  };

  useEffect(() => {
    prefetch("/treasure/add");
  }, [prefetch]);

  const viewProps: TreasureMainViewProps = {
    distance,
    position,

    onTreasureAddClick,
  };

  return <TreasureMainView {...viewProps} />;
};

export default TreasureMainController;
