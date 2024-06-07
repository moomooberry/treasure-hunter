"use client";

import { FC } from "react";

import MapView from "@src/components/map/view";
import LayoutBody from "@src/components/layout/body";
import LayoutHeader from "@src/components/layout/header";
import LayoutFooter from "@src/components/layout/footer";

export interface MapMainViewProps {}

const MapMainView: FC<MapMainViewProps> = () => (
  <>
    <LayoutHeader.Common title="지도에서 찾기" backDisabled />
    <LayoutBody>
      <MapView />
    </LayoutBody>
    <LayoutFooter.Common />
  </>
);

export default MapMainView;
