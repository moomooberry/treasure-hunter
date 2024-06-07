"use client";

import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SwiperImage from "@src/components/swiper/SwiperImage";
import TimerLimit from "@src/components/timer/TimerLimit";
import MoneyBagIcon from "@src/components/icons/MoneyBagIcon";
import LocationIcon from "@src/components/icons/LocationIcon";
import TimerIcon from "@src/components/icons/TimerIcon";
import TreasureDetailHeader from "./_layout/header";
import Image from "next/image";
import TreasureDetailBody from "./_layout/body";
import { GetTreasureDetailResponse } from "@src/types/api/treasure";
import TreasureDetailComment from "./_components/comment";

import STYLE from "./treasure.detail.module.scss";

export interface TreasureDetailViewProps {
  isLimit: boolean;
  currentTime: number;
  onLimit: VoidFunction;
  data?: GetTreasureDetailResponse;
}

const TreasureDetailView: FC<TreasureDetailViewProps> = ({
  isLimit,
  currentTime,
  onLimit,
  data,
}) => (
  <>
    <TreasureDetailHeader />

    <TreasureDetailBody>
      {data && (
        <div>
          <SwiperImage images={data.images} showImageCount />
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
                <AnimatePresence>
                  {isLimit ? (
                    <motion.div
                      className={STYLE.__treasure_detail_timer}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      보물 유효기간이 지났어요.
                    </motion.div>
                  ) : (
                    <>
                      <TimerLimit
                        currentTime={currentTime}
                        endTime={data.end_date}
                        fontSize="18px"
                        maxLength={7}
                        styleDisabled
                        onLimit={onLimit}
                      />
                      <motion.div
                        className={STYLE.__treasure_detail_timer}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        남았어요.
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <div className={STYLE.__treasure_detail_distance_wrapper}>
                <LocationIcon color="#636e72" width="16px" height="16px" />
                보물까지 @@km 떨어져 있어요.
              </div>
            </section>

            <section className={STYLE.__treasure_detail_common_section}>
              <div className={STYLE.__treasure_detail_user_wrapper}>
                <div className={STYLE.__treasure_detail_user_avatar}>
                  <Image
                    src="https://picsum.photos/200"
                    alt={`avatar_${data.user.username}`}
                    width={40}
                    height={40}
                  />
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
              <div className={STYLE.__treasure_detail_map} />
            </section>

            <section className={STYLE.__treasure_detail_last_section}>
              <TreasureDetailComment />
            </section>
          </div>
        </div>
      )}
    </TreasureDetailBody>
  </>
);

export default TreasureDetailView;
