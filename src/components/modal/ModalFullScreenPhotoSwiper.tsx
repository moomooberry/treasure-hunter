"use client";

import { FC, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import LayoutHeaderContainer from "@src/components/layout/header/_components/LayoutHeaderContainer";
import LayoutHeaderRoundButton from "@src/components/layout/header/_components/LayoutHeaderRoundButton";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import LayoutFooterContainer from "@src/components/layout/footer/_components/LayoutFooterContainer";
import PhotoSwiperCommon from "@src/components/photo/swiper/PhotoSwiperCommon";
import CloseIcon from "@src/components/icons/CloseIcon";
import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";
import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";

import ModalFullScreenContainer, {
  ModalFullScreenContainerProps,
} from "./_components/ModalFullScreenContainer";

import STYLE from "./modal.module.scss";

interface ModalFullScreenPhotoSwiperProps
  extends ModalFullScreenContainerProps {
  index: number;
  onIndexChange: (value: number) => void;
  images: string[];
}

const ModalFullScreenPhotoSwiper: FC<ModalFullScreenPhotoSwiperProps> = ({
  isOpen,
  onClose,
  backgroundColor,

  index = 0,
  onIndexChange,

  images,
}) => {
  const {
    device: { top, bottom },
  } = useZustandDeviceStore();

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
    <ModalFullScreenContainer
      isOpen={isOpen}
      onClose={onClose}
      backgroundColor={backgroundColor}
    >
      <LayoutHeaderContainer backgroundColor="transparent" shadowDisabled>
        <LayoutHeaderRoundButton onClick={onClose}>
          <CloseIcon width="14px" height="14px" />
        </LayoutHeaderRoundButton>
      </LayoutHeaderContainer>

      <LayoutBodyCommon paddingX="0">
        <PhotoSwiperCommon
          images={images}
          showImageCount={false}
          objectFit="contain"
          index={index}
          onIndexChange={onIndexChange}
          height={`calc(100vh - ${top} - ${LAYOUT_HEADER_HEIGHT} - ${bottom} - ${LAYOUT_FOOTER_HEIGHT} - 40px)`}
        />
      </LayoutBodyCommon>

      <LayoutFooterContainer backgroundColor="transparent" disabledShadow>
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
      </LayoutFooterContainer>
    </ModalFullScreenContainer>
  );
};

export default ModalFullScreenPhotoSwiper;
