"use client";

import { FC, useCallback, useMemo } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import CaretIcon from "@src/components/icons/CaretIcon";
import { LAYOUT_HEADER_HEIGHT } from "@src/constants/layout";
import { useQuery } from "@tanstack/react-query";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import getTreasure from "@src/api/treasure/getTreasure";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";

import STYLE from "./treasure.detail.header.module.scss";
import TreasureDetailHeaderOption from "./option/inedx";

const SCROLL_THRESHOLD = 300;

const TreasureDetailHeader: FC = () => {
  const { back } = useRouter();

  const { treasure_id } = useParams();

  const paddingTop = useReduxSelector((state) => state.reduxDevice.device.top);

  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0, 1]);

  const opacityReverse = useTransform(scrollY, [0, SCROLL_THRESHOLD], [1, 0]);

  const scale = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0.95, 1]);

  const boxShadow = useTransform(
    scrollY,
    [0, SCROLL_THRESHOLD],
    ["0px 4px 10px rgba(0,0,0,0)", "0px 4px 10px rgba(0,0,0,0.05)"]
  );

  const { data: treasureData } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
    queryFn: () => getTreasure({ treasure_id: treasure_id as string }),
    enabled: typeof treasure_id === "string",
  });

  const { data: userData } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  const isUserWrite = useMemo(() => {
    if (!treasureData || !userData) return false;
    return userData.id === treasureData.user.id;
  }, [treasureData, userData]);

  const onHeaderBackClick = useCallback(() => {
    back();
  }, [back]);

  return (
    <header
      className={STYLE.__layout_header_container}
      style={{
        paddingTop,
        height: LAYOUT_HEADER_HEIGHT,
      }}
    >
      {userData ? (
        <button
          className={STYLE.__layout_header_container_back_button}
          onClick={onHeaderBackClick}
        >
          <CaretIcon width="14px" height="14px" />
        </button>
      ) : (
        <div />
      )}

      {/* opacity 0 ~ 1 */}
      <motion.div
        className={STYLE.__layout_header_opacity_box}
        style={{
          opacity,
          boxShadow,
          paddingTop,
          height: LAYOUT_HEADER_HEIGHT,
        }}
      >
        <motion.b
          className={STYLE.__layout_header_title}
          style={{
            scale,
          }}
        >
          보물 찾기
        </motion.b>
      </motion.div>

      {/* opacity 1 ~ 0 */}
      <motion.div
        className={STYLE.__layout_header_opacity_reverse_box}
        style={{
          opacity: opacityReverse,
          paddingTop,
          height: LAYOUT_HEADER_HEIGHT,
        }}
      >
        <div className={STYLE.__layout_header_opacity_reverse_button} />
        <div className={STYLE.__layout_header_opacity_reverse_button_wrapper}>
          {isUserWrite && (
            <div className={STYLE.__layout_header_opacity_reverse_button} />
          )}
          <div className={STYLE.__layout_header_opacity_reverse_button} />
        </div>
      </motion.div>

      <TreasureDetailHeaderOption />
    </header>
  );
};

export default TreasureDetailHeader;
