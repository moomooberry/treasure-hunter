"use client";

import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import STYLE from "./swiper.card.module.scss";

export interface SwiperCardProps {
  images: string[];
  width?: string;
  height?: string;
  index?: number;
  onIndexChange?: (value: number) => void;
}

const SwiperCard: FC<SwiperCardProps> = ({
  images,
  width = "200px",
  height = "260px",
  index = 0,
  onIndexChange,
}) => {
  const [slideIndex, setSlideIndex] = useState(index);

  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const onSwiper = useCallback((value: SwiperClass) => {
    setSwiper(value);
  }, []);

  const onSlideChangeTransitionEnd = useCallback(
    (value: SwiperClass) => {
      setSlideIndex(value.realIndex);
      onIndexChange?.(value.realIndex);
    },
    [onIndexChange]
  );

  useEffect(() => {
    if (!swiper) return;
    swiper.slideTo(index);
  }, [index, swiper]);

  return (
    <Swiper
      onSwiper={onSwiper}
      initialSlide={slideIndex}
      onSlideChangeTransitionEnd={onSlideChangeTransitionEnd}
      effect="cards"
      grabCursor
      modules={[EffectCards]}
      style={{
        width,
        height,
      }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className={STYLE.__swiper_card_slide_wrapper}>
          <Image
            src={src}
            alt={`swiper_card_${index}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCard;
