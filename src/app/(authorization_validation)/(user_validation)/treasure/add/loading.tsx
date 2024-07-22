import { FC } from "react";

import LayoutBodyRegulatedMaxHeight from "@src/components/layout/body/LayoutBodyRegulatedMaxHeight";
import LayoutFooterSmallButton from "@src/components/layout/footer/LayoutFooterSmallButton";
import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import StatusLoadingTreasureFallback from "@src/components/status/loading/StatusLoadingTreasureFallback";

const TreasureAddLoading: FC = () => (
  <>
    <LayoutHeaderCommon backDisabled title="보물 등록" />

    <LayoutBodyRegulatedMaxHeight>
      <StatusLoadingTreasureFallback text="유저정보 불러오는 중" />
    </LayoutBodyRegulatedMaxHeight>

    <LayoutFooterSmallButton>다음</LayoutFooterSmallButton>
  </>
);

export default TreasureAddLoading;
