"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import dayjs from "dayjs";

import { GetTreasureListResponse } from "@src/types/api/treasure";
import SwiperCard from "@src/components/swiper/card";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import { LAYOUT_FOOTER_HEIGHT } from "@src/constants/layout";
import MoneyBagIcon from "@src/components/icons/MoneyBagIcon";
import TimerLimit from "@src/components/timer/TimerLimit";
import CaretIcon from "@src/components/icons/CaretIcon";
import Button from "@src/components/button";

import STYLE from "./map.main.map.module.scss";

interface MapMainMapSelectedTreasureProps {
  data: GetTreasureListResponse;
}

const MapMainMapSelectedTreasure: FC<MapMainMapSelectedTreasureProps> = ({
  data,
}) => {
  const { push, prefetch } = useRouter();

  const [isImageOpen, setIsImageOpen] = useState(true);

  const bottom = useReduxSelector((state) => state.reduxDevice.device.bottom);

  const currentTime = useMemo(() => dayjs().valueOf(), []);

  const toggleImage = useCallback(() => {
    setIsImageOpen((prev) => !prev);
  }, []);

  const routeTreasureDetail = useCallback(() => {
    push(`/treasure/${data.id}`);
  }, [data, push]);

  useEffect(() => {
    prefetch(`/treasure/${data.id}`);
  }, [data, prefetch]);

  return (
    <>
      <motion.div
        className={STYLE.__map_selected_treasure_container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          bottom: `calc(${bottom} + ${LAYOUT_FOOTER_HEIGHT})`,
        }}
      >
        <motion.div
          className={STYLE.__map_selected_treasure_info_box}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {data.reward && (
            <div className={STYLE.__map_selected_treasure_reward_wrapper}>
              <MoneyBagIcon width="15px" height="15px" />

              <span
                className={classNames({
                  [STYLE.__map_selected_treasure_info]: true,
                  [STYLE.__map_selected_treasure_info_reward]: true,
                })}
              >
                {data.reward.toLocaleString()}원
              </span>
            </div>
          )}

          <TimerLimit
            key={data.id}
            currentTime={currentTime}
            endTime={data.end_date}
            fontSize="14px"
            styleDisabled
          />

          <span
            className={classNames({
              [STYLE.__map_selected_treasure_info]: true,
              [STYLE.__map_selected_treasure_info_title]: true,
            })}
          >
            {data.title}
          </span>

          <span
            className={classNames({
              [STYLE.__map_selected_treasure_info]: true,
              [STYLE.__map_selected_treasure_info_description]: true,
            })}
          >
            {data.hint}
          </span>

          <span
            className={classNames({
              [STYLE.__map_selected_treasure_info]: true,
              [STYLE.__map_selected_treasure_info_description]: true,
            })}
          >
            {data.user.username}님의 보물
          </span>

          <Button variant="common" onClick={routeTreasureDetail}>
            보물 상세 보기
          </Button>
        </motion.div>

        <AnimatePresence>
          {isImageOpen && (
            <motion.div
              key={data.id}
              className={STYLE.__map_selected_treasure_swiper_wrapper}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
            >
              <SwiperCard images={data.images} width="45vw" />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleImage}
          className={STYLE.__map_selected_treasure_image_toggle_button}
          style={{
            bottom: `calc(${bottom} + ${LAYOUT_FOOTER_HEIGHT} + 260px + 70px + 4px)`,
            rotate: isImageOpen ? "180deg" : "0deg",
          }}
        >
          <CaretIcon width="16px" height="16px" />
        </button>
      </motion.div>
    </>
  );
};

export default MapMainMapSelectedTreasure;
