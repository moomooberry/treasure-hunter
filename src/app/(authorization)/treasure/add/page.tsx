import { Suspense } from "react";
import TreasureFormController from "@src/screens/treasure/form/TreasureFormController";
import TreasureFormFallback from "@src/screens/treasure/form/TreasureFormFallback";

const TreasureAddPage = () => (
  <Suspense fallback={<TreasureFormFallback />}>
    <TreasureFormController />
  </Suspense>
);

export default TreasureAddPage;
