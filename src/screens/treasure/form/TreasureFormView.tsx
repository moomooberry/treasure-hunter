"use client";

import { FC, MouseEventHandler } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegisterReturn,
} from "react-hook-form";

import FormInputImage, {
  FormImageInputError,
} from "@src/components/form/FormInputImage";
import FormInputText from "@src/components/form/FormInputText";
import FormLabel from "@src/components/form/FormLabel";
import FormTextarea from "@src/components/form/FormTextarea";
import { TreasureMap } from "@src/libs/google-map";
import { ImageInputValue } from "@src/types/image";
import { Position } from "@src/types/position";
import FormText from "@src/components/form/FormText";
import LayoutHeader from "@src/components/layout/header";
import LayoutBody from "@src/components/layout/body";
import LayoutFooter from "@src/components/layout/footer";
import scanningImageSrc from "@src/assets/lottie/scanning_image.json";
import tremblingMarkerSrc from "@src/assets/lottie/trembling_marker.json";
import ModalCommonCheck from "@src/components/modal/common/ModalCommonCheck";
import Lottie from "@src/components/lottie";

import TreasureFormMap from "./_components/map";

import STYLE from "./treasure.form.module.scss";

export interface TreasureFormFields {
  /* STEP 1 */
  title: string;
  hint: string;
  reward?: string;
  images: ImageInputValue[];
  /* STEP 2 */
  position: Position;
}

export interface TreasureFormViewProps {
  treasure_id?: string;
  pathname: string;
  step: "1" | "2";

  control: Control<TreasureFormFields>;
  registerProps: {
    [K in keyof TreasureFormFields]?: UseFormRegisterReturn;
  };
  errors: FieldErrors<TreasureFormFields>;

  clearImageError: VoidFunction;
  clearPositionError: VoidFunction;

  onPositionError: (value: TreasureMap["_error"]) => void;
  onImageError: (value: FormImageInputError) => void;
  onPosition: (value: Position) => void;
  onNextStepClick: MouseEventHandler<HTMLButtonElement>;
  onSubmitClick: MouseEventHandler<HTMLButtonElement>;
}

const TreasureFormView: FC<TreasureFormViewProps> = ({
  treasure_id,
  pathname,
  step,

  control,
  registerProps,
  errors,

  clearImageError,
  clearPositionError,

  onPositionError,
  onImageError,
  onPosition,
  onNextStepClick,
  onSubmitClick,
}) => (
  <>
    <LayoutHeader.Common
      title={pathname.endsWith("/add") ? "보물 등록" : "보물 수정"}
    />

    <LayoutBody.Common paddingX={step === "1" && !treasure_id ? "0" : "12px"}>
      {!treasure_id && step === "1" ? (
        <TreasureFormMap onError={onPositionError} onPosition={onPosition} />
      ) : (
        <>
          <div className={STYLE.__image_wrapper}>
            <FormLabel text="이미지" isRequired />
            <Controller
              control={control}
              name="images"
              render={({ field: { value, onChange } }) => (
                <FormInputImage
                  maxLength={10}
                  value={value}
                  onChange={onChange}
                  onError={onImageError}
                />
              )}
            />
            <FormText.Notice
              text="한 장당 최대 20mb까지 등록 가능해요."
              m="12px 0 0 0"
            />
            <FormText.Notice
              text="최대 10장까지 등록 가능해요."
              m="4px 0 0 0"
            />
          </div>

          <label className={STYLE.__label_wrapper}>
            <FormLabel text="제목" isRequired />
            <FormInputText
              placeholder="최대 30자까지 입력"
              maxLength={30}
              showMaxLength
              isError={!!errors.title}
              {...registerProps.title}
            />
            {errors.title && <FormText.Error text={errors.title.message} />}
          </label>

          <label className={STYLE.__label_wrapper}>
            <FormLabel text="힌트" isRequired />
            <FormTextarea
              placeholder="최대 300자까지 입력"
              maxLength={300}
              showMaxLength
              isError={!!errors.hint}
              {...registerProps.hint}
            />
            {errors.hint && <FormText.Error text={errors.hint.message} />}
          </label>

          <label>
            <FormLabel text="보상금" />
            <FormInputText
              inputMode="numeric"
              maxLength={7}
              m="0 0 13px 0"
              disabled={!!treasure_id}
              isError={!!errors.reward}
              placeholder="최대 100만원"
              {...registerProps.reward}
            />
            <FormText.Notice text="보상금은 수정이 불가해요." />
            {errors.reward?.types?.pattern && (
              <FormText.Error text={errors.reward.types.pattern.toString()} />
            )}
            {errors.reward?.types?.max && (
              <FormText.Error text={errors.reward.types.max.toString()} />
            )}
          </label>
        </>
      )}
    </LayoutBody.Common>

    <ModalCommonCheck
      isOpen={
        !!errors.images?.types?.size ||
        !!errors.images?.types?.maxLength ||
        !!errors.images?.types?.required
      }
      onClose={clearImageError}
      title="확인해주세요!"
      buttons={[{ text: "닫기", onClick: clearImageError, variant: "cancel" }]}
    >
      <div className={STYLE.__check_modal_wrapper}>
        <div className={STYLE.__check_modal_lottie_wrapper}>
          <Lottie
            animationData={scanningImageSrc}
            width="180px"
            height="180px"
          />
        </div>

        <div className={STYLE.__check_modal_error_wrapper}>
          {errors.images?.types?.size && (
            <div className={STYLE.__check_modal_error}>
              {errors.images.types.size}
            </div>
          )}
          {errors.images?.types?.maxLength && (
            <div className={STYLE.__check_modal_error}>
              {errors.images.types.maxLength}
            </div>
          )}
          {errors.images?.types?.required && (
            <div className={STYLE.__check_modal_error}>
              {errors.images.types.required}
            </div>
          )}
        </div>
      </div>
    </ModalCommonCheck>

    <ModalCommonCheck
      isOpen={!!errors.position?.types?.isOverBuffer}
      onClose={clearPositionError}
      title="확인해주세요!"
      buttons={[
        { text: "닫기", onClick: clearPositionError, variant: "cancel" },
      ]}
    >
      <div className={STYLE.__check_modal_wrapper}>
        <div className={STYLE.__check_modal_lottie_wrapper}>
          <Lottie
            animationData={tremblingMarkerSrc}
            width="180px"
            height="180px"
          />
        </div>

        <div className={STYLE.__check_modal_error_wrapper}>
          {errors.position?.types?.isOverBuffer && (
            <div className={STYLE.__check_modal_error}>
              {errors.position.types.isOverBuffer}
            </div>
          )}
        </div>
      </div>
    </ModalCommonCheck>

    {!treasure_id && step === "1" ? (
      <LayoutFooter.SmallButton
        backgroundColor="#fff"
        disabledShadow={false}
        onClick={onNextStepClick}
      >
        다음
      </LayoutFooter.SmallButton>
    ) : (
      <LayoutFooter.MaxWidthButton
        backgroundColor="#fff"
        disabledShadow={false}
        onClick={onSubmitClick}
        disabled={!!errors.images}
      >
        저장하기
      </LayoutFooter.MaxWidthButton>
    )}
  </>
);

export default TreasureFormView;
