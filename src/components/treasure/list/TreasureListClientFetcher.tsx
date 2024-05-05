"use client";

import { FC, useCallback } from "react";
import getTreasureList, {
  API_GET_TREASURE_LIST_KEY,
} from "@src/api/treasure/getTreasureList";
import { Position } from "@src/types/position";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Observer from "@src/components/observer";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";

import STYLE from "./treasure.list.module.scss";

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
      <ul className={STYLE.__treasure_list_ul}>
        {data.pages.map((page) => {
          if (!page.data) return null;

          return page.data.map((item) => (
            <li
              key={item.id}
              className={STYLE.__treasure_list_li}
              onClick={onListClick(item.id)}
            >
              <div className={STYLE.__treasure_list_image_wrapper}>
                <Image
                  src={item.imgSrc[0]}
                  alt="treasure_image"
                  width={96}
                  height={96}
                />
              </div>

              <div className={STYLE.__treasure_list_info_box}>
                <div className={STYLE.__treasure_list_title}>{item.title}</div>

                <div>
                  {item.reward && (
                    <div className={STYLE.__treasure_list_reward}>
                      ₩: {item.reward.toLocaleString()}원
                    </div>
                  )}
                  <div className={STYLE.__treasure_list_end_date}>
                    {dayjs(item.endDate).format("YYYY.MM.DD HH:mm 까지")}
                  </div>
                </div>
              </div>
            </li>
          ));
        })}
      </ul>

      {hasNextPage && <Observer minHeight="45px" onObserve={onObserve} />}
    </>
  );
};

export default TreasureListClientFetcher;
