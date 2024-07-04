"use client";

import { FC, MouseEventHandler } from "react";
import dynamic from "next/dynamic";

import { Position } from "@src/types/position";
import TreasureMapIcon from "@src/components/icons/TreasureMapIcon";
import LayoutBody from "@src/components/layout/body";
import LayoutHeader from "@src/components/layout/header";
import LayoutFooter from "@src/components/layout/footer";

const TreasureMainList = dynamic(() => import("./_components/list"));

export interface TreasureMainViewProps {
  distance: number;
  position: Position;

  onTreasureAddClick: MouseEventHandler<HTMLButtonElement>;
}

const TreasureMainView: FC<TreasureMainViewProps> = ({
  distance,
  position,

  onTreasureAddClick,
}) => (
  <>
    <LayoutHeader.Common
      title="보물 찾기"
      backDisabled
      option={
        <LayoutHeader.Option.MaxSizeButton onClick={onTreasureAddClick}>
          <TreasureMapIcon width="32px" height="32px" />
        </LayoutHeader.Option.MaxSizeButton>
      }
    />

    <LayoutBody.Common>
      <TreasureMainList distance={distance} position={position} />
    </LayoutBody.Common>

    <LayoutFooter.Common />
  </>
);

export default TreasureMainView;
