"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

import LayoutFooterCommon from "@src/components/layout/footer/LayoutFooterCommon";
import LayoutBodyRegulatedMaxHeight from "@src/components/layout/body/LayoutBodyRegulatedMaxHeight";
import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";

import STYLE from "./map.main.module.scss";

const MapMainMap = dynamic(() => import("./_components/map/index"), {
  ssr: false,
  loading: () => <div className={STYLE.__map_skeleton} />,
});

export interface MapMainViewProps {}

const MapMainView: FC<MapMainViewProps> = () => (
  <>
    <LayoutHeaderCommon title="지도에서 찾기" backDisabled />

    <LayoutBodyRegulatedMaxHeight>
      <MapMainMap />
    </LayoutBodyRegulatedMaxHeight>

    <LayoutFooterCommon />
  </>
);

export default MapMainView;
