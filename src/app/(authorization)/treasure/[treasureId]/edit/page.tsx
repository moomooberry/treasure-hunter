import { Suspense } from "react";
import TreasureFormFallback from "@src/screens/treasure/form/TreasureFormFallback";
import TreasureFormFetcher from "@src/screens/treasure/form/TreasureFormFetcher";

const TreasureDetailEditPage = ({
  params: { treasureId },
}: {
  params: { treasureId: string };
}) => (
  <Suspense fallback={<TreasureFormFallback />}>
    <TreasureFormFetcher treasureId={treasureId} />
  </Suspense>
);

export default TreasureDetailEditPage;
