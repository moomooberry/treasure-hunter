"use client";

import { FC, useCallback } from "react";
import TreasureDetailHeaderOption from "./TreasureDetailHeaderOption";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import CaretIcon from "@src/components/icons/CaretIcon";
import { LAYOUT_HEADER_HEIGHT } from "@src/constants/layout";

import STYLE from "./treasure.detail.header.module.scss";

const SCROLL_THRESHOLD = 300;

const TreasureDetailHeader: FC = () => {
  const { back } = useRouter();

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
      <button
        className={STYLE.__layout_header_container_back_button}
        onClick={onHeaderBackClick}
      >
        <CaretIcon width="14px" height="14px" />
      </button>

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
        <div className={STYLE.__layout_header_opacity_reverse_button} />
      </motion.div>

      <TreasureDetailHeaderOption />
    </header>
  );
};

export default TreasureDetailHeader;
