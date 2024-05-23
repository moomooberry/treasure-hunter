import { Suspense } from "react";
import TreasureDetailFallback from "@src/screens/treasure/detail/TreasureDetailFallback";
import TreasureDetailFetcher from "@src/screens/treasure/detail/TreasureDetailFetcher";

const TreasureDetailPage = ({
  params: { treasureId },
}: {
  params: { treasureId: string };
}) => (
  <Suspense fallback={<TreasureDetailFallback />}>
    <TreasureDetailFetcher treasureId={treasureId} />
  </Suspense>
);

export default TreasureDetailPage;
