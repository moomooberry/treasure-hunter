import { Suspense } from "react";
import TreasureMainFallback from "@src/screens/treasure/main/TreasureMainFallback";
import TreasureMainFetcher from "@src/screens/treasure/main/TreasureMainFetcher";

const TreasurePage = () => (
  <Suspense fallback={<TreasureMainFallback length={10} />}>
    <TreasureMainFetcher />
  </Suspense>
);

export default TreasurePage;
