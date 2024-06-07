"use client";

import { FC, MouseEventHandler } from "react";
import { InfiniteData } from "@tanstack/react-query";

import { Position } from "@src/types/position";
import { RequestPaginationResponse } from "@src/types/api";
import Observer from "@src/components/observer";
import { GetTreasureListResponse } from "@src/types/api/treasure";
import ControllerPage from "@src/components/controller/ControllerPage";
import TreasureMapIcon from "@src/components/icons/TreasureMapIcon";
import LayoutBody from "@src/components/layout/body";
import LayoutHeader from "@src/components/layout/header";
import LayoutFooter from "@src/components/layout/footer";

import TreasureMainListItem from "./_components/list/TreasureMainListItem";

import STYLE from "./treasure.main.module.scss";

export interface TreasureMainViewProps {
  distance: number;
  position: Position;
  currentTime: number;
  hasNextPage: boolean;

  onObserve: VoidFunction;
  onItemClick: (id: number) => MouseEventHandler<HTMLLIElement>;
  onTreasureAddClick: MouseEventHandler<HTMLButtonElement>;

  data?: InfiniteData<RequestPaginationResponse<GetTreasureListResponse[]>>;
}

const TreasureMainView: FC<TreasureMainViewProps> = ({
  distance,
  position,
  currentTime,
  hasNextPage,

  onObserve,
  onItemClick,
  onTreasureAddClick,

  data,
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
      {data && data.pages[0].data.length !== 0 && (
        <>
          <ul className={STYLE.__treasure_main_ul}>
            {data.pages.map((page) =>
              page.data.map((item) => (
                <TreasureMainListItem
                  key={item.id}
                  onItemClick={onItemClick(item.id)}
                  currentTime={currentTime}
                  item={item}
                />
              ))
            )}
          </ul>

          {hasNextPage && <Observer minHeight="45px" onObserve={onObserve} />}
        </>
      )}

      {data && data.pages[0].data.length === 0 && (
        <ControllerPage.Empty text="근처에 보물이 없어요.<br/>보물을 등록해보세요" />
      )}
    </LayoutBody.Common>

    <LayoutFooter.Common />
  </>
);

export default TreasureMainView;
