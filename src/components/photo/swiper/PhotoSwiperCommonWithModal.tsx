"use client";

import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper as ReactSwiper, SwiperClass, SwiperSlide } from "swiper/react";
import classNames from "classnames";

import ModalFullScreenPhotoSwiper from "@src/components/modal/ModalFullScreenPhotoSwiper";

import STYLE from "../photo.module.scss";

interface PhotoSwiperCommonWithModalProps {
  images: string[];

  height?: string;
  showImageCount?: boolean;
  objectFit?: "contain" | "cover";
}

const PhotoSwiperCommonWithModal: FC<PhotoSwiperCommonWithModalProps> = ({
  images,

  height = "300px",
  showImageCount = true,
  objectFit = "cover",
}) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [slideIndex, setSlideIndex] = useState<number>(0);

  const onSwiper = useCallback((value: SwiperClass) => {
    setSwiper(value);
  }, []);

  const onSlideChangeTransitionEnd = useCallback((value: SwiperClass) => {
    setSlideIndex(value.realIndex);
  }, []);

  const onIndexChange = useCallback((value: number) => {
    setSlideIndex(value);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (!swiper) return;
    swiper.slideTo(slideIndex);
  }, [slideIndex, swiper]);

  return (
    <>
      <div className={STYLE.__swiper_image_container} onClick={openModal}>
        <ReactSwiper
          onSwiper={onSwiper}
          initialSlide={slideIndex}
          onSlideChangeTransitionEnd={onSlideChangeTransitionEnd}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div
                className={STYLE.__swiper_image_slide_layout}
                style={{
                  height,
                }}
              >
                <Image
                  priority
                  src={src}
                  alt={`slide_image_${index}`}
                  fill
                  style={{ objectFit }}
                />
              </div>
            </SwiperSlide>
          ))}
        </ReactSwiper>

        {showImageCount && images.length > 1 && (
          <div className={STYLE.__swiper_image_count_box}>
            {images.map((_, i) => (
              <div
                key={i}
                className={classNames({
                  [STYLE.__swiper_image_count_dot]: true,
                  [STYLE.__swiper_image_count_dot_active]: i === slideIndex,
                })}
              />
            ))}
          </div>
        )}
      </div>

      <ModalFullScreenPhotoSwiper
        isOpen={isModalOpen}
        onClose={closeModal}
        backgroundColor="#000"
        index={slideIndex}
        onIndexChange={onIndexChange}
        images={images}
      />
    </>
  );
};

export default PhotoSwiperCommonWithModal;
