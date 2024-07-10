"use client";

import { FC } from "react";
import { useParams } from "next/navigation";
import { UseFormRegisterReturn, UseFormReturn } from "react-hook-form";

import FormTextNotice from "@src/components/form/text/FormTextNotice";
import FormInputText from "@src/components/form/input/FormInputText";
import FormTextLabel from "@src/components/form/text/FormTextLabel";
import FormInputTextarea from "@src/components/form/input/FormInputTextarea";
import type { TreasureFormFields } from "@src/screens/treasure/form/TreasureFormView";

import STYLE from "@src/screens/treasure/form/treasure.form.module.scss";

interface TreasureFormStepInfoProps {
  formMethods: UseFormReturn<TreasureFormFields>;
}

const TreasureFormStepInfo: FC<TreasureFormStepInfoProps> = ({
  formMethods: { register },
}) => {
  const { treasure_id } = useParams();

  const registerProps: {
    [k in keyof TreasureFormFields]?: UseFormRegisterReturn;
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

  return (
    <div className={STYLE.__slide_container}>
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
          disabled={!!treasure_id}
          placeholder={!treasure_id ? "최대 100만원까지 입력" : ""}
          {...registerProps.reward}
        />
        <FormTextNotice text="보상금은 추후에 수정할 수 없고 최대 100만원까지 입력 가능해요." />
      </label>
    </div>
  );
};

export default TreasureFormStepInfo;
