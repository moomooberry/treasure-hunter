import { FC, Suspense } from "react";
import TreasureListFallback from "./TreasureListFallback";
import TreasureListClientFetcher from "./TreasureListClientFetcher";
import { Position } from "@src/types/position";

interface TreasureListProps {
  distance: number;
  position: Position;
}

const TreasureList: FC<TreasureListProps> = async ({ distance, position }) => (
  <Suspense fallback={<TreasureListFallback />}>
    <TreasureListClientFetcher distance={distance} position={position} />
  </Suspense>
);

export default TreasureList;
