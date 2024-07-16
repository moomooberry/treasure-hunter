"use client";

import { FC, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import { motion } from "framer-motion";

import postImageUserProfile from "@src/api/image/user/postImageUserProfile";
import getUser from "@src/api/user/getUser";
import putUser from "@src/api/user/putUser";
import FormInputText from "@src/components/form/input/FormInputText";
import FormTextError from "@src/components/form/text/FormTextError";
import FormTextLabel from "@src/components/form/text/FormTextLabel";
import FormTextNotice from "@src/components/form/text/FormTextNotice";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import LayoutFooterMaxWidthButton from "@src/components/layout/footer/LayoutFooterMaxWidthButton";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import { ImageInputValue } from "@src/types/image";
import convertFileToFormData from "@src/utils/convertFileToFormData";
import FormInputAvatarImageEditor from "@src/components/form/input/FormInputAvatarImageEditor";

import STYLE from "./user.edit.form.module.scss";

interface UserEditFormFields {
  username: string;
  profile_image: ImageInputValue | null;
}

const UserEditForm: FC = () => {
  const { back } = useRouter();

  const { data } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  const { mutateAsync: uploadImage } = useMutation({
    mutationFn: postImageUserProfile,
  });

  const { mutate: editUser } = useMutation({
    mutationFn: putUser,
    onSuccess: () => {
      back();
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserEditFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      profile_image: data?.profile_image
        ? { id: v4(), src: data.profile_image }
        : null,
      username: data?.username,
    },
  });

  const onValid = useCallback<SubmitHandler<UserEditFormFields>>(
    async ({ username, profile_image }) => {
      let src = null;

      if (profile_image) {
        if (typeof profile_image.src !== "string") {
          const { path } = await uploadImage({
            formData: convertFileToFormData(profile_image.src),
          });
          src = path;
        } else {
          src = profile_image.src;
        }
      }

      editUser({ username, profile_image: src });
    },
    [editUser, uploadImage]
  );

  return (
    <>
      <LayoutBodyCommon>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FormTextLabel text="프로필 이미지" />
          <div className={STYLE.__image_input_wrapper}>
            <Controller
              name="profile_image"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormInputAvatarImageEditor value={value} onChange={onChange} />
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
              {...register("username", {
                required: {
                  value: true,
                  message: "최대 10자로 이름을 입력해주세요.",
                },
              })}
              placeholder="최대 10자까지 입력"
              maxLength={10}
              showMaxLength
            />
          </label>

          {errors.username && (
            <FormTextError text={errors.username.message} m="0 0 4px 0" />
          )}
        </motion.div>
      </LayoutBodyCommon>

      <Controller
        name="username"
        control={control}
        render={({ field: { value } }) => (
          <LayoutFooterMaxWidthButton
            disabled={!value}
            onClick={handleSubmit(onValid)}
          >
            저장하기
          </LayoutFooterMaxWidthButton>
        )}
      />
    </>
  );
};

export default UserEditForm;
