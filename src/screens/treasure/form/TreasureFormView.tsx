"use client";

import FormErrorText from "@src/components/form/FormErrorText";
import FormInputImage from "@src/components/form/FormInputImage";
import FormInputText from "@src/components/form/FormInputText";
import FormLabel from "@src/components/form/FormLabel";
import FormTextarea from "@src/components/form/FormTextarea";
import Layout from "@src/components/layout";
import MapAdd from "@src/components/map/add";
import { TreasureMap } from "@src/libs/google-map";
import { ImageInputValue } from "@src/types/image";
import { Position } from "@src/types/position";
import { FC, MouseEventHandler } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegisterReturn,
} from "react-hook-form";
import TreasureFormHeader from "./_layout/header";
import TreasureFormFooterNextButton from "./_layout/footer/TreasureFormFooterNextButton";
import TreasureFormFooterSubmitButton from "./_layout/footer/TreasureFormFooterSubmitButton";

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
  id?: string;
  step: "1" | "2";

  control: Control<TreasureFormFields>;
  registerProps: {
    [K in keyof TreasureFormFields]?: UseFormRegisterReturn;
  };
  errors: FieldErrors<TreasureFormFields>;

  onError: (value: TreasureMap["_error"]) => void;
  onPosition: (value: Position) => void;
  onNextStepClick: MouseEventHandler<HTMLButtonElement>;
  onSubmitClick: MouseEventHandler<HTMLButtonElement>;
}

const TreasureFormView: FC<TreasureFormViewProps> = ({
  id,
  step,

  control,
  registerProps,
  errors,

  onError,
  onPosition,
  onNextStepClick,
  onSubmitClick,
}) => (
  <Layout>
    <TreasureFormHeader />
    <Layout.Body>
      {!id && step === "1" ? (
        <MapAdd onError={onError} onPosition={onPosition} />
      ) : (
        <div className={STYLE.__container}>
          <div className={STYLE.__image_wrapper}>
            <FormLabel text="이미지" isRequired />
            <Controller
              control={control}
              name="images"
              render={({ field: { value, onChange } }) => (
                <FormInputImage value={value} onChange={onChange} />
              )}
            />
          </div>

          <label className={STYLE.__label_wrapper}>
            <FormLabel text="제목" isRequired />
            <FormInputText
              maxLength={20}
              showMaxLength
              isError={!!errors.title}
              {...registerProps.title}
            />
            <FormErrorText text={errors.title?.message} />
          </label>

          <label className={STYLE.__label_wrapper}>
            <FormLabel text="힌트" isRequired />
            <FormTextarea
              maxLength={300}
              showMaxLength
              isError={!!errors.hint}
              {...registerProps.hint}
            />
            <FormErrorText text={errors.hint?.message} />
          </label>

          <label>
            <FormLabel text="보상금" />
            <FormInputText
              inputMode="numeric"
              maxLength={7}
              m="0 0 13px 0"
              disabled={!!id}
              isError={!!errors.reward}
              placeholder="최대 100만원"
              {...registerProps.reward}
            />
            {/* TODO 보상금 수정안되는거 noticeText */}
            {!!id && <span>보상금은 수정이 안돼요</span>}
            <FormErrorText text={errors.reward?.types?.pattern?.toString()} />
            <FormErrorText text={errors.reward?.types?.max?.toString()} />
          </label>
        </div>
      )}
    </Layout.Body>

    {!id && step === "1" ? (
      <TreasureFormFooterNextButton onClick={onNextStepClick} />
    ) : (
      <TreasureFormFooterSubmitButton onClick={onSubmitClick} />
    )}
  </Layout>
);

export default TreasureFormView;
