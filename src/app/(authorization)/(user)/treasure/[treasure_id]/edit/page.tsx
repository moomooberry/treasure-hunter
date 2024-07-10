import { Suspense } from "react";

import TreasureFormFallback from "@src/screens/treasure/form/TreasureFormFallback";
import TreasureFormFetcher from "@src/screens/treasure/form/TreasureFormFetcher";

const TreasureDetailEditPage = ({
  params: { treasure_id },
}: {
  params: { treasure_id: string };
}) => (
  <Suspense fallback={<TreasureFormFallback />}>
    <TreasureFormFetcher treasure_id={treasure_id} />
  </Suspense>
);

export default TreasureDetailEditPage;
