"use client";

import { FC, useCallback, useMemo } from "react";
import getTreasureList, {
  API_GET_TREASURE_LIST_KEY,
} from "@src/api/treasure/getTreasureList";
import { Position } from "@src/types/position";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Observer from "@src/components/observer";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import MoneyBagIcon from "@src/components/icons/MoneyBagIcon";
import SwiperImage from "@src/components/swiper/SwiperImage";

import STYLE from "./treasure.list.module.scss";
import TimerLimit from "@src/components/timer/TimerLimit";

interface TreasureListClientFetcherProps {
  position: Position;
  distance: number;
}

const TreasureListClientFetcher: FC<TreasureListClientFetcherProps> = ({
  distance,
  position,
}) => {
  const { push } = useRouter();

  const currentTime = useMemo(() => dayjs().valueOf(), []);

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
              <SwiperImage height="240px" images={item.imgSrc} />

              <div className={STYLE.__treasure_list_info_box}>
                <div className={STYLE.__treasure_list_title}>{item.title}</div>

                <div className={STYLE.__treasure_list_user}>@@님의 보물</div>

                {item.reward && (
                  <div className={STYLE.__treasure_list_reward}>
                    <div className={STYLE.__treasure_money_bag_wrapper}>
                      <MoneyBagIcon width="20px" height="20px" />
                    </div>
                    {item.reward.toLocaleString()}원
                  </div>
                )}

                <div className={STYLE.__treasure_list_timer_wrapper}>
                  <TimerLimit
                    currentTime={currentTime}
                    endTime={item.endDate}
                    maxLength={7}
                    fontSize="20px"
                  />
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
