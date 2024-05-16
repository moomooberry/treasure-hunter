import { FC, Suspense } from "react";
import TreasureListFallback from "./TreasureListFallback";
import TreasureListClientFetcher from "./TreasureListClientFetcher";
import { Position } from "@src/types/position";

interface TreasureListProps {
  distance: number;
  position: Position;
}

const TreasureList: FC<TreasureListProps> = ({ distance, position }) => (
  <>
    <Suspense fallback={<TreasureListFallback length={10} />}>
      <TreasureListClientFetcher distance={distance} position={position} />
    </Suspense>
  </>
);

export default TreasureList;
