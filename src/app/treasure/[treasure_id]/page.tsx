import { Suspense } from "react";
import TreasureDetailFallback from "@src/screens/treasure/detail/TreasureDetailFallback";
import TreasureDetailFetcher from "@src/screens/treasure/detail/TreasureDetailFetcher";

const TreasureDetailPage = ({
  params: { treasure_id },
}: {
  params: { treasure_id: string };
}) => (
  <Suspense fallback={<TreasureDetailFallback />}>
    <TreasureDetailFetcher treasure_id={treasure_id} />
  </Suspense>
);

export default TreasureDetailPage;
