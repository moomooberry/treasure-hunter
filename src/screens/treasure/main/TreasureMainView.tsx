"use client";

import { FC, MouseEventHandler } from "react";
import Layout from "@src/components/layout";
import { Position } from "@src/types/position";
import { RequestPaginationResponse } from "@src/types/api";
import { InfiniteData } from "@tanstack/react-query";
import Observer from "@src/components/observer";
import TreasureMainHeaderOption from "./_layout/header/TreasureMainHeaderOption";
import TreasureMainListItem from "./_components/list/TreasureMainListItem";
import { GetTreasureListResponse } from "@src/types/api/treasure";
import ControllerPage from "@src/components/controller/ControllerPage";

import STYLE from "./treasure.main.module.scss";

export interface TreasureMainViewProps {
  distance: number;
  position: Position;
  currentTime: number;
  hasNextPage: boolean;

  onObserve: VoidFunction;
  onItemClick: (id: number) => MouseEventHandler<HTMLLIElement>;

  data?: InfiniteData<RequestPaginationResponse<GetTreasureListResponse[]>>;
}

const TreasureMainView: FC<TreasureMainViewProps> = ({
  distance,
  position,
  currentTime,
  hasNextPage,

  onObserve,
  onItemClick,

  data,
}) => (
  <Layout>
    <Layout.Header
      title="보물 찾기"
      backDisabled
      option={<TreasureMainHeaderOption />}
    />
    <Layout.Body>
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
    </Layout.Body>
    <Layout.Footer />
  </Layout>
);

export default TreasureMainView;
