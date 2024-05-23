"use client";

import { FC } from "react";
import MapMainView, { MapMainViewProps } from "./MapMainView";

const MapMainController: FC = () => {
  const viewProps: MapMainViewProps = {};

  return <MapMainView {...viewProps} />;
};

export default MapMainController;
