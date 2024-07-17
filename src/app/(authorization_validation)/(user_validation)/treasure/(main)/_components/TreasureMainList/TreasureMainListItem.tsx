"use client";

import { FC, MouseEventHandler } from "react";
import dynamic from "next/dynamic";

import PhotoSwiperCommon from "@src/components/photo/swiper/PhotoSwiperCommon";
import type { GetTreasureListResponse } from "@src/types/api/treasure";

import STYLE from "./treasure.main.list.module.scss";

const MoneyBagIcon = dynamic(
  () => import("@src/components/icons/MoneyBagIcon")
);

const TimerLimit = dynamic(() => import("@src/components/timer/TimerLimit"));

interface TreasureMainListItemProps {
  currentTime: number;
  item: GetTreasureListResponse;

  onItemClick: MouseEventHandler<HTMLLIElement>;
}

const TreasureMainListItem: FC<TreasureMainListItemProps> = ({
  currentTime,
  item,

  onItemClick,
}) => (
  <li className={STYLE.__treasure_list_wrapper} onClick={onItemClick}>
    <PhotoSwiperCommon height="240px" images={item.images} />

    <div className={STYLE.__treasure_list_info_box}>
      <div className={STYLE.__treasure_list_title}>{item.title}</div>

      <div className={STYLE.__treasure_list_user}>
        {item.user.username}님의 보물
      </div>

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
          endTime={item.end_date}
          maxLength={7}
          fontSize="20px"
        />
      </div>
    </div>
  </li>
);

export default TreasureMainListItem;
