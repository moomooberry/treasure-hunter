"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

import MoneyBagIcon from "@src/components/icons/MoneyBagIcon";
import LocationIcon from "@src/components/icons/LocationIcon";
import TimerIcon from "@src/components/icons/TimerIcon";
import Avatar from "@src/components/avatar/Avatar";
import type { GetTreasureDetailResponse } from "@src/types/api/treasure";

import TreasureDetailLayoutBody from "./_components/layout/TreasureDetailLayoutBody";
import TreasureDetailMapFallback from "./_components/map/TreasureDetailMapFallback";

import STYLE from "./treasure.detail.module.scss";

const TreasureDetailLayoutHeader = dynamic(
  () => import("./_components/layout/header")
);

const TreasureDetailPhotoSwiper = dynamic(
  () => import("./_components/TreasureDetailPhotoSwiper")
);

const TreasureDetailComment = dynamic(() => import("./_components/comment"));

const TreasureDetailMap = dynamic(() => import("./_components/map"), {
  ssr: false,
  loading: () => <TreasureDetailMapFallback />,
});

const TreasureDetailTimerLimit = dynamic(
  () => import("./_components/TreasureDetailTimerLimit")
);

export interface TreasureDetailViewProps {
  data?: GetTreasureDetailResponse;
}

const TreasureDetailView: FC<TreasureDetailViewProps> = ({ data }) => (
  <>
    <TreasureDetailLayoutHeader />

    <TreasureDetailLayoutBody>
      {data && (
        <div>
          <TreasureDetailPhotoSwiper images={data.images} />

          <div className={STYLE.__treasure_detail_container}>
            <section className={STYLE.__treasure_detail_first_section}>
              <h1 className={STYLE.__treasure_detail_title}>{data.title}</h1>

              {data.reward && (
                <div className={STYLE.__treasure_detail_reward}>
                  <MoneyBagIcon width="20px" height="20px" />
                  {data.reward.toLocaleString()}원
                </div>
              )}

              <div className={STYLE.__treasure_detail_timer_wrapper}>
                <TimerIcon color="#2d3436" width="18px" height="18px" />
                <TreasureDetailTimerLimit />
              </div>

              <div className={STYLE.__treasure_detail_distance_wrapper}>
                <LocationIcon color="#636e72" width="16px" height="16px" />
                보물까지 @@km 떨어져 있어요.
              </div>
            </section>

            <section className={STYLE.__treasure_detail_common_section}>
              <div className={STYLE.__treasure_detail_user_wrapper}>
                <div className={STYLE.__treasure_detail_user_avatar}>
                  <Avatar imageSrc={data.user.profile_image} />
                </div>
                <div className={STYLE.__treasure_detail_user}>
                  {data.user.username}님의 보물
                </div>
              </div>
            </section>

            <section className={STYLE.__treasure_detail_common_section}>
              <h3 className={STYLE.__treasure_detail_common_label}>힌트</h3>
              <div>{data.hint}</div>
            </section>

            <section className={STYLE.__treasure_detail_common_section}>
              <h3 className={STYLE.__treasure_detail_common_label}>위치</h3>
              <TreasureDetailMap />
            </section>

            <section className={STYLE.__treasure_detail_last_section}>
              <TreasureDetailComment />
            </section>
          </div>
        </div>
      )}
    </TreasureDetailLayoutBody>
  </>
);

export default TreasureDetailView;
