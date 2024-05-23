"use client";

import { FC } from "react";
import Layout from "@src/components/layout";
import MapView from "@src/components/map/view";

export interface MapMainViewProps {}

const MapMainView: FC<MapMainViewProps> = () => (
  <Layout>
    <Layout.Header title="지도에서 찾기" backDisabled />
    <Layout.Body>
      <MapView />
    </Layout.Body>
    <Layout.Footer />
  </Layout>
);

export default MapMainView;
