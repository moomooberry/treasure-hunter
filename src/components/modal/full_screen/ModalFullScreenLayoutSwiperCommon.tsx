"use client";

import { FC, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import LayoutHeader from "@src/components/layout/header";
import CloseIcon from "@src/components/icons/CloseIcon";
import Swiper from "@src/components/swiper/common";
import LayoutBody from "@src/components/layout/body";
import LayoutFooter from "@src/components/layout/footer";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";

import ModalFullScreen, { ModalFullScreenProps } from ".";

import STYLE from "./modal.full.screen.module.scss";

interface ModalFullScreenLayoutSwiperCommonProps extends ModalFullScreenProps {
  index: number;
  onIndexChange: (value: number) => void;
  images: string[];
}

const ModalFullScreenLayoutSwiperCommon: FC<
  ModalFullScreenLayoutSwiperCommonProps
> = ({
  isOpen,
  onClose,
  backgroundColor,

  index = 0,
  onIndexChange,

  images,
}) => {
  const { top, bottom } = useReduxSelector((state) => state.reduxDevice.device);

  const onFooterImageClick = useCallback(
    (value: number) => {
      const handler = () => {
        onIndexChange(value);
      };
      return handler;
    },
    [onIndexChange]
  );

  return (
    <ModalFullScreen
      isOpen={isOpen}
      onClose={onClose}
      backgroundColor={backgroundColor}
    >
      <LayoutHeader backgroundColor="transparent" shadowDisabled>
        <LayoutHeader.Option.RoundButton onClick={onClose}>
          <CloseIcon width="14px" height="14px" />
        </LayoutHeader.Option.RoundButton>
      </LayoutHeader>

      <LayoutBody.Common paddingX="0">
        <Swiper
          images={images}
          showImageCount={false}
          objectFit="contain"
          index={index}
          onIndexChange={onIndexChange}
          height={`calc(100vh - ${top} - ${LAYOUT_HEADER_HEIGHT} - ${bottom} - ${LAYOUT_FOOTER_HEIGHT} - 40px)`}
        />
      </LayoutBody.Common>

      <LayoutFooter backgroundColor="transparent" disabledShadow>
        <div className={STYLE.__swiper_footer_container}>
          <motion.div
            className={STYLE.__swiper_footer_image_button_wrapper}
            initial={{ x: "calc(50vw - 16px - 18px)" }} // gap * 2 -> (8 * 2)px, image / 2 -> (36 / 2)px
            animate={{ x: `calc(50vw - 16px - 18px - ${(36 + 8) * index}px)` }} // (image + gap)* index -> ((36 + 8) * index)px
            transition={{ damping: 20, stiffness: 400 }}
          >
            {images.map((src, i) => (
              <motion.button
                key={i}
                className={STYLE.__swiper_footer_image_button}
                animate={{
                  y: i === index ? -6 : 0,
                  opacity: i === index ? 1 : 0.6,
                }}
                onClick={onFooterImageClick(i)}
              >
                <Image
                  priority
                  src={src}
                  alt={`${i + 1}_slide`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </LayoutFooter>
    </ModalFullScreen>
  );
};

export default ModalFullScreenLayoutSwiperCommon;
