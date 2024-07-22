import { FC } from "react";

import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyRegulatedMaxHeight from "@src/components/layout/body/LayoutBodyRegulatedMaxHeight";
import LayoutFooterSmallButton from "@src/components/layout/footer/LayoutFooterSmallButton";
import StatusLoadingTreasureFallback from "@src/components/status/loading/StatusLoadingTreasureFallback";

const TreasureEditLoading: FC = () => (
  <>
    <LayoutHeaderCommon backDisabled title="보물 수정" />

    <LayoutBodyRegulatedMaxHeight>
      <StatusLoadingTreasureFallback text="유저정보 불러오는 중" />
    </LayoutBodyRegulatedMaxHeight>

    <LayoutFooterSmallButton>다음</LayoutFooterSmallButton>
  </>
);

export default TreasureEditLoading;
