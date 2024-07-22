"use client";

import { FC, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Controller,
  UseFormRegisterReturn,
  useFormContext,
} from "react-hook-form";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";

import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyRegulatedMaxHeight from "@src/components/layout/body/LayoutBodyRegulatedMaxHeight";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import StatusLoadingTreasureFallback from "@src/components/status/loading/StatusLoadingTreasureFallback";
import FormInputImageEditor, {
  FormInputImageEditorError,
} from "@src/components/form/input/FormInputImageEditor";
import FormTextLabel from "@src/components/form/text/FormTextLabel";
import FormTextNotice from "@src/components/form/text/FormTextNotice";
import FormInputText from "@src/components/form/input/FormInputText";
import FormInputTextarea from "@src/components/form/input/FormInputTextarea";

import type { TreasureAddFormFields } from "../../TreasureAddForm";

import STYLE from "./treasure.add.form.content.module.scss";

const TreasureAddFormContentFooterButton = dynamic(
  () => import("./TreasureAddFormContentFooterButton")
);
const TreasureAddFormContentPosition = dynamic(
  () => import("./TreasureAddFormContentPosition"),
  {
    ssr: false,
    loading: () => (
      <StatusLoadingTreasureFallback text="위치정보 불러오는 중" />
    ),
  }
);

const TreasureAddFormContent: FC = () => {
  const swiperInstance = useRef<SwiperClass>();

  const { setValue, control, setError, register } =
    useFormContext<TreasureAddFormFields>();

  const registerProps: {
    [k in keyof TreasureAddFormFields]?: UseFormRegisterReturn;
  } = {
    title: register("title", {
      required: {
        value: true,
        message: "제목을 작성하되 최대 30자로 입력해 주세요.",
      },
    }),
    hint: register("hint", {
      required: {
        value: true,
        message: "힌트를 작성하되 최대 1000자로 입력해 주세요.",
      },
    }),
    reward: register("reward", {
      pattern: {
        value: /^\d+$/,
        message: "보상금은 숫자만 입력해주세요.",
      },
      max: {
        value: 1000000,
        message: "보상금은 최대 100만원까지만 입력 가능해요.",
      },
    }),
  };

  const onSlideChangeTransitionStart = (value: SwiperClass) => {
    const slideIndex = value.realIndex;
    let step: TreasureAddFormFields["currentSlide"] = "position";

    if (slideIndex === 0) step = "position";
    if (slideIndex === 1) step = "image";
    if (slideIndex === 2) step = "info";
    if (slideIndex === 3) step = "payment";

    setValue("currentSlide", step);
  };

  const onImageError = (value: FormInputImageEditorError) => {
    setError("images", {
      types: {
        size: value.isSizeError && "이미지는 20mb를 초과할 수 없어요.",
        maxLength: value.isMaxLengthError && "이미지는 최대 10장까지 가능해요.",
      },
    });
  };

  const onSwiper = (value: SwiperClass) => {
    swiperInstance.current = value;
  };

  const onBackClick = () => {
    const swiper = swiperInstance.current;

    if (!swiper) return;

    if (swiper.isBeginning) {
      setError("currentSlide", {
        types: {
          isEnd: "정말 나가시겠어요?",
        },
      });
      return;
    }

    swiper.slidePrev(230);
  };

  return (
    <Swiper
      className={STYLE.__swiper_container}
      allowTouchMove={false}
      spaceBetween={30}
      effect="fade"
      modules={[EffectFade]}
      onSwiper={onSwiper}
      onSlideChangeTransitionStart={onSlideChangeTransitionStart}
    >
      <LayoutHeaderCommon title="보물 등록" onBackClick={onBackClick} />

      {/* 1. Position */}
      <SwiperSlide className={STYLE.__swiper_slide_container}>
        <LayoutBodyRegulatedMaxHeight>
          <TreasureAddFormContentPosition />
        </LayoutBodyRegulatedMaxHeight>
      </SwiperSlide>

      {/* 2. Image */}
      <SwiperSlide className={STYLE.__swiper_slide_container}>
        <LayoutBodyCommon>
          <FormTextLabel text="이미지" isRequired />

          <Controller
            control={control}
            name="images"
            render={({ field: { value, onChange } }) => (
              <FormInputImageEditor
                value={value}
                onChange={onChange}
                onError={onImageError}
              />
            )}
          />
          <FormTextNotice
            text="한 장당 최대 20mb까지 등록 가능해요."
            m="24px 0 0 0"
          />
          <FormTextNotice text="최대 10장까지 등록 가능해요." m="4px 0 0 0" />
        </LayoutBodyCommon>
      </SwiperSlide>

      {/* 3. Info */}
      <SwiperSlide className={STYLE.__swiper_slide_container}>
        <LayoutBodyCommon>
          <label className={STYLE.__label_wrapper}>
            <FormTextLabel text="제목" isRequired />
            <FormInputText
              placeholder="최대 30자까지 입력"
              maxLength={30}
              showMaxLength
              {...registerProps.title}
            />
          </label>
          <label className={STYLE.__label_wrapper}>
            <FormTextLabel text="힌트" isRequired />
            <FormInputTextarea
              placeholder="최대 1000자까지 입력"
              maxLength={1000}
              showMaxLength
              {...registerProps.hint}
            />
          </label>
          <label>
            <FormTextLabel text="보상금" />
            <FormInputText
              inputMode="numeric"
              maxLength={7}
              m="0 0 12px 0"
              placeholder="최대 100만원까지 입력"
              {...registerProps.reward}
            />
            <FormTextNotice text="보상금은 추후에 수정할 수 없고 최대 100만원까지 입력 가능해요." />
          </label>
        </LayoutBodyCommon>
      </SwiperSlide>

      {/* 4. Payment */}
      <SwiperSlide className={STYLE.__swiper_slide_container}>
        <LayoutBodyCommon>
          {/* TODO */}
          @@payment
        </LayoutBodyCommon>
      </SwiperSlide>

      <TreasureAddFormContentFooterButton />
    </Swiper>
  );
};

export default TreasureAddFormContent;
