"use client";

import { FC, useCallback } from "react";
import getTreasureList, {
  API_GET_TREASURE_LIST_KEY,
} from "@src/api/treasure/getTreasureList";
import { Position } from "@src/types/position";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Observer from "@src/components/observer";
import { useRouter } from "next/navigation";

interface TreasureListClientFetcherProps {
  position: Position;
  distance: number;
}

const TreasureListClientFetcher: FC<TreasureListClientFetcherProps> = ({
  distance,
  position,
}) => {
  const { push } = useRouter();

  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: [API_GET_TREASURE_LIST_KEY],
    queryFn: ({ pageParam }) =>
      getTreasureList({
        distance,
        position,
        pageNumber: pageParam,
        pageSize: 1,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) =>
      lastPage.pagination.totalElement <= allPage.length * 1
        ? null
        : lastPage.pagination.pageNumber + 1,
  });

  const onObserve = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  const onListClick = useCallback(
    (id: number) => {
      const handler = () => {
        push(`/treasure/${id}`);
      };
      return handler;
    },
    [push]
  );

  return (
    <>
      <ul>
        {data.pages.map((page) => {
          if (!page.data) return null;

          return page.data.map((item) => (
            <li
              key={item.id}
              style={{
                height: "100vh",
                border: "1px solid red",
              }}
              onClick={onListClick(item.id)}
            >
              {item.title}
            </li>
          ));
        })}
      </ul>
      {hasNextPage && <Observer minHeight="45px" onObserve={onObserve} />}
    </>
  );
};

export default TreasureListClientFetcher;
