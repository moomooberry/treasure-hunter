"use client";

import dynamic from "next/dynamic";

import LayoutBodyRegulatedMaxHeight from "@src/components/layout/body/LayoutBodyRegulatedMaxHeight";

import MapMainMapBodyFallback from "./MapMainMapBody/MapMainMapBodyFallback";

const MapMainMapBody = dynamic(() => import("./MapMainMapBody"), {
  ssr: false,
  loading: () => <MapMainMapBodyFallback />,
});

const MapMainMap = () => (
  <LayoutBodyRegulatedMaxHeight>
    <MapMainMapBody />
  </LayoutBodyRegulatedMaxHeight>
);

export default MapMainMap;
