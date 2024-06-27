"use client";

import { FC } from "react";

import { Position } from "@src/types/position";

import MapMainView, { MapMainViewProps } from "./MapMainView";

interface MapMainControllerProps {
  distance: number;
  position: Position;
}

const MapMainController: FC<MapMainControllerProps> = ({
  distance,
  position,
}) => {
  const viewProps: MapMainViewProps = {};

  return <MapMainView {...viewProps} />;
};

export default MapMainController;
