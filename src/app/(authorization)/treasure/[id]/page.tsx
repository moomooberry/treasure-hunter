import { Suspense } from "react";
import TreasureDetailFallback from "@src/screens/treasure/detail/TreasureDetailFallback";
import TreasureDetailFetcher from "@src/screens/treasure/detail/TreasureDetailFetcher";

const TreasureDetailPage = ({ params: { id } }: { params: { id: string } }) => (
  <Suspense fallback={<TreasureDetailFallback />}>
    <TreasureDetailFetcher id={id} />
  </Suspense>
);

export default TreasureDetailPage;
