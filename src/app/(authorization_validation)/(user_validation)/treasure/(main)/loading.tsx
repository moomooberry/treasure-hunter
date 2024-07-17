import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import LayoutFooterMain from "@src/components/layout/footer/LayoutFooterMain";
import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";

import TreasureMainFallback from "./_components/TreasureMainFallback";

const TreasureMainLoading = () => (
  <>
    <LayoutHeaderCommon title="보물 찾기" backDisabled />
    <LayoutBodyCommon>
      <TreasureMainFallback length={10} />
    </LayoutBodyCommon>
    <LayoutFooterMain />
  </>
);

export default TreasureMainLoading;
