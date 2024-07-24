"use client";

import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Swiper as ReactSwiper, SwiperClass, SwiperSlide } from "swiper/react";

import STYLE from "./photo.swiper.common.module.scss";

interface PhotoSwiperCommonProps {
  images: string[];

  height?: string;
  showImageCount?: boolean;
  objectFit?: "contain" | "cover";

  index?: number;
  onIndexChange?: (value: number) => void;
}

const PhotoSwiperCommon: FC<PhotoSwiperCommonProps> = ({
  images,

  height = "300px",
  showImageCount = true,
  objectFit = "cover",

  index = 0,
  onIndexChange,
}) => {
  const [slideIndex, setSlideIndex] = useState(index);

  const onSlideChangeTransitionEnd = useCallback(
    (value: SwiperClass) => {
      setSlideIndex(value.realIndex);
      onIndexChange?.(value.realIndex);
    },
    [onIndexChange]
  );

  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const onSwiper = useCallback((value: SwiperClass) => {
    setSwiper(value);
  }, []);

  useEffect(() => {
    if (!swiper) return;
    swiper.slideTo(index);
  }, [index, swiper]);

  return (
    <div className={STYLE.__swiper_image_container}>
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
  );
};

export default PhotoSwiperCommon;
