import { FC, Suspense } from "react";
import MapMainFetcher from "@src/screens/map/main/MapMainFetcher";
import MapMainFallback from "@src/screens/map/main/MapMainFallback";

const MapPage: FC = () => (
  <Suspense fallback={<MapMainFallback />}>
    <MapMainFetcher />
  </Suspense>
);

export default MapPage;
