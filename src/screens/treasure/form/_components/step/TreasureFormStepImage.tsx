"use client";

import { FC, useCallback } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import Form from "@src/components/form";
import { TreasureFormFields } from "@src/screens/treasure/form/TreasureFormView";
import { FormInputImageEditorError } from "@src/components/form/input/FormInputImageEditor";

import STYLE from "@src/screens/treasure/form/treasure.form.module.scss";

interface TreasureFormStepImageProps {
  formMethods: UseFormReturn<TreasureFormFields>;
}

const TreasureFormStepImage: FC<TreasureFormStepImageProps> = ({
  formMethods: { control, setError },
}) => {
  const onError = useCallback(
    (value: FormInputImageEditorError) => {
      setError("images", {
        types: {
          size: value.isSizeError && "이미지는 20mb를 초과할 수 없어요.",
          maxLength:
            value.isMaxLengthError && "이미지는 최대 10장까지 가능해요.",
        },
      });
    },
    [setError]
  );

  return (
    <div className={STYLE.__slide_container}>
      <Form.Text.Label text="이미지" isRequired />

      <Controller
        control={control}
        name="images"
        render={({ field: { value, onChange } }) => (
          <Form.Input.ImageEditor
            value={value}
            onChange={onChange}
            onError={onError}
          />
        )}
      />

      <Form.Text.Notice
        text="한 장당 최대 20mb까지 등록 가능해요."
        m="24px 0 0 0"
      />
      <Form.Text.Notice text="최대 10장까지 등록 가능해요." m="4px 0 0 0" />
    </div>
  );
};

export default TreasureFormStepImage;
