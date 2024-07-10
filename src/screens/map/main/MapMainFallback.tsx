"use client";

import { FC } from "react";

import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import LayoutFooterCommon from "@src/components/layout/footer/LayoutFooterCommon";

const MapMainFallback: FC = () => (
  <>
    <LayoutHeaderCommon title="지도에서 찾기" backDisabled />
    <LayoutBodyCommon />
    <LayoutFooterCommon />
  </>
);

export default MapMainFallback;
