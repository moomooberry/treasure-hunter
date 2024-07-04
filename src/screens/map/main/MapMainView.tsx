"use client";

import { FC } from "react";

import LayoutBody from "@src/components/layout/body";
import LayoutHeader from "@src/components/layout/header";
import LayoutFooter from "@src/components/layout/footer";
import dynamic from "next/dynamic";

const MapMainMap = dynamic(() => import("./_components/map/index"), {
  ssr: false,
});

export interface MapMainViewProps {}

const MapMainView: FC<MapMainViewProps> = () => (
  <>
    <LayoutHeader.Common title="지도에서 찾기" backDisabled />

    <LayoutBody.RegulatedMaxHeight>
      <MapMainMap />
    </LayoutBody.RegulatedMaxHeight>

    <LayoutFooter.Common />
  </>
);

export default MapMainView;
