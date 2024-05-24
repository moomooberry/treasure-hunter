"use client";

import { FC, MouseEventHandler } from "react";
import FormInputImage from "@src/components/form/FormInputImage";
import FormInputText from "@src/components/form/FormInputText";
import FormLabel from "@src/components/form/FormLabel";
import FormTextarea from "@src/components/form/FormTextarea";
import Layout from "@src/components/layout";
import MapAdd from "@src/components/map/add";
import { TreasureMap } from "@src/libs/google-map";
import { ImageInputValue } from "@src/types/image";
import { Position } from "@src/types/position";
import FormText from "@src/components/form/FormText";
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
  treasure_id?: string;
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
  treasure_id,
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
      {!treasure_id && step === "1" ? (
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
              placeholder="최대 20자까지 입력"
              maxLength={20}
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
        </div>
      )}
    </Layout.Body>

    {!treasure_id && step === "1" ? (
      <TreasureFormFooterNextButton onClick={onNextStepClick} />
    ) : (
      <TreasureFormFooterSubmitButton onClick={onSubmitClick} />
    )}
  </Layout>
);

export default TreasureFormView;
