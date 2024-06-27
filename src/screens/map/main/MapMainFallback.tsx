"use client";

import { FC } from "react";

import LayoutBody from "@src/components/layout/body";
import LayoutHeader from "@src/components/layout/header";
import LayoutFooter from "@src/components/layout/footer";

const MapMainFallback: FC = () => (
  <>
    <LayoutHeader.Common title="지도에서 찾기" backDisabled />
    <LayoutBody.Common />
    <LayoutFooter.Common />
  </>
);

export default MapMainFallback;
