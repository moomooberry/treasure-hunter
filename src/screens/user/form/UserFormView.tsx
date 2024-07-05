"use client";

import { FC, MouseEventHandler } from "react";
import dynamic from "next/dynamic";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegisterReturn,
} from "react-hook-form";

import Form from "@src/components/form";
import { GetUserResponse } from "@src/types/api/user";
import { ImageInputValue } from "@src/types/image";
import LayoutBody from "@src/components/layout/body";
import LayoutHeader from "@src/components/layout/header";
import LayoutFooter from "@src/components/layout/footer";

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
    <LayoutHeader.Common title={data ? "프로필 수정" : "프로필 만들기"} />

    <LayoutBody.Common>
      <Form.Text.Label text="프로필 이미지" />
      <div className={STYLE.__image_input_wrapper}>
        <Controller
          name="profile_image"
          control={control}
          render={({ field: { value, onChange } }) => (
            <UserFormImageEditor value={value} onChange={onChange} />
          )}
        />
      </div>

      <Form.Text.Notice
        text="프로필 이미지는 20mb를 초과할 수 없어요."
        m="0 0 20px 0"
      />

      <label>
        <Form.Text.Label isRequired text="유저이름" />
        <Form.Input.Text
          isError={!!errors.username}
          {...registerProps.username}
          placeholder="최대 10자까지 입력"
          maxLength={10}
          showMaxLength
        />
      </label>

      {errors.username && (
        <Form.Text.Error text={errors.username.message} m="0 0 4px 0" />
      )}
    </LayoutBody.Common>

    <Controller
      name="username"
      control={control}
      render={({ field: { value } }) => (
        <LayoutFooter.MaxWidthButton disabled={!value} onClick={onSubmitClick}>
          저장하기
        </LayoutFooter.MaxWidthButton>
      )}
    />
  </>
);

export default UserFormView;
