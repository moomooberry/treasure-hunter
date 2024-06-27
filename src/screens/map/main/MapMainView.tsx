"use client";

import { FC } from "react";

import LayoutBody from "@src/components/layout/body";
import LayoutHeader from "@src/components/layout/header";
import LayoutFooter from "@src/components/layout/footer";

import MapMainMap from "./_components/map";

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
