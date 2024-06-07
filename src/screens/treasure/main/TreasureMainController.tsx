"use client";

import { FC, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Position } from "@src/types/position";
import getTreasureList from "@src/api/treasure/getTreasureList";
import { API_GET_TREASURE_LIST_KEY } from "@src/libs/fetch/key/treasure";

import TreasureMainView, { TreasureMainViewProps } from "./TreasureMainView";

interface TreasureMainControllerProps {
  distance: number;
  position: Position;
}

const TreasureMainController: FC<TreasureMainControllerProps> = ({
  distance,
  position,
}) => {
  const { push, prefetch } = useRouter();

  const currentTime = useMemo(() => dayjs().valueOf(), []);

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

  const onObserve = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  const onTreasureAddClick = useCallback(() => {
    push("/treasure/add");
  }, [push]);

  const onItemClick = useCallback(
    (id: number) => {
      const handler = () => {
        push(`/treasure/${id}`);
      };
      return handler;
    },
    [push]
  );

  useEffect(() => {
    prefetch("/treasure/add");
  }, [prefetch]);

  const viewProps: TreasureMainViewProps = {
    distance,
    position,
    currentTime,
    hasNextPage,

    onObserve,
    onItemClick,
    onTreasureAddClick,

    data,
  };

  return <TreasureMainView {...viewProps} />;
};

export default TreasureMainController;
