"use client";

import { FC, useCallback, useMemo } from "react";
import TreasureMainView, { TreasureMainViewProps } from "./TreasureMainView";
import { Position } from "@src/types/position";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useInfiniteQuery } from "@tanstack/react-query";
import getTreasureList, {
  API_GET_TREASURE_LIST_KEY,
} from "@src/api/treasure/getTreasureList";

interface TreasureMainControllerProps {
  distance: number;
  position: Position;
}

const TreasureMainController: FC<TreasureMainControllerProps> = ({
  distance,
  position,
}) => {
  const { push } = useRouter();

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

  const onItemClick = useCallback(
    (id: number) => {
      const handler = () => {
        push(`/treasure/${id}`);
      };
      return handler;
    },
    [push]
  );

  const viewProps: TreasureMainViewProps = {
    distance,
    position,
    currentTime,
    hasNextPage,

    onObserve,
    onItemClick,

    data,
  };

  return <TreasureMainView {...viewProps} />;
};

export default TreasureMainController;
