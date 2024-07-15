"use client";

import LayoutBodyRegulatedMaxHeight from "@src/components/layout/body/LayoutBodyRegulatedMaxHeight";
import LayoutFooterCommon from "@src/components/layout/footer/LayoutFooterCommon";
import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";

import MapMainMapFallback from "./_components/MapMainMap/MapMainMapFallback";

const MapLoading = () => (
  <>
    <LayoutHeaderCommon title="지도에서 찾기" backDisabled />

    <LayoutBodyRegulatedMaxHeight>
      <MapMainMapFallback text="보물 데이터 받아오는 중" />
    </LayoutBodyRegulatedMaxHeight>

    <LayoutFooterCommon />
  </>
);

export default MapLoading;
