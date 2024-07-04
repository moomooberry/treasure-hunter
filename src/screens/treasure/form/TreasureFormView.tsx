"use client";

import { FC, MouseEventHandler } from "react";
import dynamic from "next/dynamic";
import { UseFormReturn } from "react-hook-form";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";

import { ImageInputValue } from "@src/types/image";
import { Position } from "@src/types/position";
import LayoutHeader from "@src/components/layout/header";
import LayoutBody from "@src/components/layout/body";

import TreasureFormStep from "./_components/step";

import STYLE from "./treasure.form.module.scss";

const TreasureFormFooterButton = dynamic(
  () => import("./_components/TreasureFormFooterButton")
);

const TreasureFormErrorModal = dynamic(
  () => import("./_components/TreasureFormErrorModal")
);

export interface TreasureFormFields {
  slideIndex: number;

  position: Position;
  images: ImageInputValue[];
  title: string;
  hint: string;
  reward?: string;
}

export interface TreasureFormViewProps {
  treasure_id?: string;
  swiper: SwiperClass | null;
  formMethods: UseFormReturn<TreasureFormFields>;

  onSwiper: (value: SwiperClass) => void;
  onSlideChangeTransitionStart: (value: SwiperClass) => void;
  onBackClick: MouseEventHandler<HTMLButtonElement>;
}

const TreasureFormView: FC<TreasureFormViewProps> = ({
  treasure_id,
  swiper,
  formMethods,

  onSwiper,
  onSlideChangeTransitionStart,
  onBackClick,
}) => (
  <>
    <LayoutHeader.Common
      title={!treasure_id ? "보물 등록" : "보물 수정"}
      onBackClick={onBackClick}
    />

    <LayoutBody.RegulatedMaxHeight>
      {/* <TreasureFormGuide formMethods={formMethods} /> */}

      <Swiper
        className={STYLE.__form_swiper_container}
        spaceBetween={30}
        effect="fade"
        modules={[EffectFade]}
        onSwiper={onSwiper}
        allowTouchMove={false}
        onSlideChangeTransitionStart={onSlideChangeTransitionStart}
      >
        {!treasure_id && (
          <SwiperSlide className={STYLE.__form_swiper_slide_container}>
            <TreasureFormStep.Position formMethods={formMethods} />
          </SwiperSlide>
        )}

        <SwiperSlide className={STYLE.__form_swiper_slide_container}>
          <TreasureFormStep.Image formMethods={formMethods} />
        </SwiperSlide>

        <SwiperSlide className={STYLE.__form_swiper_slide_container}>
          <TreasureFormStep.Info formMethods={formMethods} />
        </SwiperSlide>

        {!treasure_id && (
          <SwiperSlide className={STYLE.__form_swiper_slide_container}>
            <TreasureFormStep.Payment />
          </SwiperSlide>
        )}
      </Swiper>

      <TreasureFormErrorModal formMethods={formMethods} />
    </LayoutBody.RegulatedMaxHeight>

    {swiper && (
      <TreasureFormFooterButton swiper={swiper} formMethods={formMethods} />
    )}
  </>
);

export default TreasureFormView;
