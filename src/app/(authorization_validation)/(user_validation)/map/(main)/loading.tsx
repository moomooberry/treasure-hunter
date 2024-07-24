import { FC } from "react";

import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyRegulatedMaxHeight from "@src/components/layout/body/LayoutBodyRegulatedMaxHeight";
import LayoutFooterMain from "@src/components/layout/footer/LayoutFooterMain";
import StatusLoadingTreasureFallback from "@src/components/status/loading/StatusLoadingTreasureFallback";

const MapLoading: FC = () => (
  <>
    <LayoutHeaderCommon title="지도에서 찾기" backDisabled />

    <LayoutBodyRegulatedMaxHeight>
      <StatusLoadingTreasureFallback text="보물 데이터 받아오는 중" />
    </LayoutBodyRegulatedMaxHeight>

    <LayoutFooterMain />
  </>
);

export default MapLoading;
