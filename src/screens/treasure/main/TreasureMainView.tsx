"use client";

import { FC, MouseEventHandler } from "react";
import dynamic from "next/dynamic";

import LayoutFooterCommon from "@src/components/layout/footer/LayoutFooterCommon";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutHeaderMaxSizeButton from "@src/components/layout/header/_components/LayoutHeaderMaxSizeButton";
import TreasureMapIcon from "@src/components/icons/TreasureMapIcon";
import type { Position } from "@src/types/position";

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
    <LayoutHeaderCommon
      title="보물 찾기"
      backDisabled
      option={
        <LayoutHeaderMaxSizeButton onClick={onTreasureAddClick}>
          <TreasureMapIcon width="32px" height="32px" />
        </LayoutHeaderMaxSizeButton>
      }
    />

    <LayoutBodyCommon>
      <TreasureMainList distance={distance} position={position} />
    </LayoutBodyCommon>

    <LayoutFooterCommon />
  </>
);

export default TreasureMainView;
