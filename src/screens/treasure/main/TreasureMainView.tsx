"use client";

import { FC, MouseEventHandler } from "react";
import Layout from "@src/components/layout";
import { Position } from "@src/types/position";
import TreasureMainHeaderOption from "./_layout/header/TreasureMainHeaderOption";
import { RequestPaginationResponse } from "@src/types/api";
import { TreasureItem } from "@src/types/treasure";
import { InfiniteData } from "@tanstack/react-query";
import Observer from "@src/components/observer";
import TreasureMainListItem from "./_components/list/TreasureMainListItem";

import STYLE from "./treasure.main.module.scss";

export interface TreasureMainViewProps {
  distance: number;
  position: Position;
  currentTime: number;
  hasNextPage: boolean;

  onObserve: VoidFunction;
  onItemClick: (id: number) => MouseEventHandler<HTMLLIElement>;

  data?: InfiniteData<RequestPaginationResponse<TreasureItem[]>>;
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
      <ul className={STYLE.__treasure_main_ul}>
        {data?.pages.map((page) =>
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
    </Layout.Body>
    <Layout.Footer />
  </Layout>
);

export default TreasureMainView;
