"use client";

import { FC, useCallback, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";

import STYLE from "./swiper.module.scss";

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

      {showImageCount && (
        <div className={STYLE.__swiper_image_count_box}>
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default SwiperImage;
