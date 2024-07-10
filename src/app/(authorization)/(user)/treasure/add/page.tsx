import { Suspense } from "react";

import TreasureFormFallback from "@src/screens/treasure/form/TreasureFormFallback";
import TreasureFormFetcher from "@src/screens/treasure/form/TreasureFormFetcher";

const TreasureAddPage = () => (
  <Suspense fallback={<TreasureFormFallback />}>
    <TreasureFormFetcher />
  </Suspense>
);

export default TreasureAddPage;
