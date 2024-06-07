"use client";

import { FC, MouseEventHandler } from "react";

import FormInputText from "@src/components/form/FormInputText";
import FormLabel from "@src/components/form/FormLabel";
import Layout from "@src/components/layout";
import { GetUserResponse } from "@src/types/api/user";
import { ImageInputValue } from "@src/types/image";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegisterReturn,
} from "react-hook-form";
import LayoutFooterMaxWidthButton from "@src/components/layout/footer/LayoutFooterMaxWidthButton";
import FormText from "@src/components/form/FormText";

import UserFormImageInput from "./_components/image_input";

import STYLE from "./user.form.module.scss";

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
  <Layout>
    <Layout.Header title={data ? "프로필 수정" : "프로필 만들기"} />
    <Layout.Body>
      <div
        style={{
          padding: "20px 12px",
        }}
      >
        <FormLabel text="프로필 이미지" />
        <div className={STYLE.__image_input_wrapper}>
          <Controller
            name="profile_image"
            control={control}
            render={({ field: { value, onChange } }) => (
              <UserFormImageInput value={value} onChange={onChange} />
            )}
          />
        </div>

        <FormText.Notice
          text="프로필 이미지는 20mb를 초과할 수 없어요."
          m="0 0 20px 0"
        />

        <label>
          <FormLabel isRequired text="유저이름" />
          <FormInputText
            isError={!!errors.username}
            {...registerProps.username}
            placeholder="최대 10자까지 입력"
            maxLength={10}
            showMaxLength
          />
        </label>

        {errors.username && (
          <FormText.Error text={errors.username.message} m="0 0 4px 0" />
        )}
      </div>
    </Layout.Body>

    <Controller
      name="username"
      control={control}
      render={({ field: { value } }) => (
        <LayoutFooterMaxWidthButton disabled={!value} onClick={onSubmitClick}>
          저장하기
        </LayoutFooterMaxWidthButton>
      )}
    />
  </Layout>
);

export default UserFormView;
