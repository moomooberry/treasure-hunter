"use client";

import { FC, MouseEventHandler } from "react";
import dynamic from "next/dynamic";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegisterReturn,
} from "react-hook-form";

import LayoutFooterMaxWidthButton from "@src/components/layout/footer/LayoutFooterMaxWidthButton";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import FormTextError from "@src/components/form/text/FormTextError";
import FormInputText from "@src/components/form/input/FormInputText";
import FormTextLabel from "@src/components/form/text/FormTextLabel";
import FormTextNotice from "@src/components/form/text/FormTextNotice";
import type { GetUserResponse } from "@src/types/api/user";
import type { ImageInputValue } from "@src/types/image";

import STYLE from "./user.form.module.scss";

const UserFormImageEditor = dynamic(
  () => import("./_components/UserFormImageEditor")
);

export interface UserFormFields {
  username: string;
  profile_image: ImageInputValue | null;
}

export interface UserFormViewProps {
  data?: GetUserResponse | null;
  control: Control<UserFormFields>;
  registerProps: {
    [K in keyof UserFormFields]?: UseFormRegisterReturn;
  };
  errors: FieldErrors<UserFormFields>;

  onSubmitClick: MouseEventHandler<HTMLButtonElement>;
}

const UserFormView: FC<UserFormViewProps> = ({
  data,
  control,
  registerProps,
  errors,
  onSubmitClick,
}) => (
  <>
    <LayoutHeaderCommon title={data ? "프로필 수정" : "프로필 만들기"} />

    <LayoutBodyCommon>
      <FormTextLabel text="프로필 이미지" />
      <div className={STYLE.__image_input_wrapper}>
        <Controller
          name="profile_image"
          control={control}
          render={({ field: { value, onChange } }) => (
            <UserFormImageEditor value={value} onChange={onChange} />
          )}
        />
      </div>

      <FormTextNotice
        text="프로필 이미지는 20mb를 초과할 수 없어요."
        m="0 0 20px 0"
      />

      <label>
        <FormTextLabel isRequired text="유저이름" />
        <FormInputText
          isError={!!errors.username}
          {...registerProps.username}
          placeholder="최대 10자까지 입력"
          maxLength={10}
          showMaxLength
        />
      </label>

      {errors.username && (
        <FormTextError text={errors.username.message} m="0 0 4px 0" />
      )}
    </LayoutBodyCommon>

    <Controller
      name="username"
      control={control}
      render={({ field: { value } }) => (
        <LayoutFooterMaxWidthButton disabled={!value} onClick={onSubmitClick}>
          저장하기
        </LayoutFooterMaxWidthButton>
      )}
    />
  </>
);

export default UserFormView;
