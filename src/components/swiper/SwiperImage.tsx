"use client";

import { FC, useCallback, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import STYLE from "./swiper.module.scss";
import "swiper/css";

interface SwiperImageProps {
  height?: string;
  images: string[];
  showImageCount?: boolean;
}

const SwiperImage: FC<SwiperImageProps> = ({
  height = "300px",
  showImageCount = true,
  images,
}) => {
  const [index, setIndex] = useState(0);

  const onSlideChangeTransitionEnd = useCallback((value: SwiperClass) => {
    setIndex(value.realIndex);
  }, []);

  return (
    <div className={STYLE.__swiper_image_container}>
      <Swiper onSlideChangeTransitionEnd={onSlideChangeTransitionEnd}>
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
                style={{ objectFit: "cover" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {showImageCount && images.length > 1 && (
        <div className={STYLE.__swiper_image_count_box}>
          {images.map((_, i) => (
            <div
              key={i}
              className={classNames({
                [STYLE.__swiper_image_count_dot]: true,
                [STYLE.__swiper_image_count_dot_active]: i === index,
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SwiperImage;
