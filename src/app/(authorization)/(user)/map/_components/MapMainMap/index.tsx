"use client";

import dynamic from "next/dynamic";

import LayoutBodyRegulatedMaxHeight from "@src/components/layout/body/LayoutBodyRegulatedMaxHeight";

import MapMainMapFallback from "./MapMainMapFallback";

const MapMainMapBody = dynamic(() => import("./MapMainMapBody"), {
  ssr: false,
  loading: () => <MapMainMapFallback text="보물 지도 생성중" />,
});

const MapMainMap = () => (
  <LayoutBodyRegulatedMaxHeight>
    <MapMainMapBody />
  </LayoutBodyRegulatedMaxHeight>
);

export default MapMainMap;
