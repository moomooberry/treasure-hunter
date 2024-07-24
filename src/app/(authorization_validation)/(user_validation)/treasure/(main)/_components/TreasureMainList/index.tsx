"use client";

import { FC, useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import StatusEmptyPage from "@src/components/status/empty/StausEmptyPage";
import Observer from "@src/components/observer/Observer";
import getTreasureList from "@src/api/treasure/getTreasureList";
import { API_GET_TREASURE_LIST_KEY } from "@src/libs/fetch/key/treasure";
import type { Position } from "@src/types/position";

import TreasureMainListItem from "./TreasureMainListItem";

import STYLE from "./treasure.main.list.module.scss";

interface TreasureMainListProps {
  distance: number;
  position: Position;
}

const TreasureMainList: FC<TreasureMainListProps> = ({
  distance,
  position,
}) => {
  const { push } = useRouter();

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [API_GET_TREASURE_LIST_KEY],
    queryFn: ({ pageParam }) =>
      getTreasureList({
        distance,
        position,
        pageNumber: pageParam,
        pageSize: 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) =>
      lastPage.pagination.totalElement <= allPage.length * 10
        ? null
        : lastPage.pagination.pageNumber + 1,
  });

  const currentTime = useMemo(() => dayjs().valueOf(), []);

  const onItemClick = useCallback(
    (id: string) => {
      const handler = () => {
        push(`/treasure/${id}`);
      };
      return handler;
    },
    [push]
  );

  const onObserve = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
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
        <StatusEmptyPage text="근처에 보물이 없어요.<br/>보물을 등록해보세요" />
      )}
    </>
  );
};

export default TreasureMainList;
