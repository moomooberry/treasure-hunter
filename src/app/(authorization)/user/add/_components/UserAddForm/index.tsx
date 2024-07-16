"use client";

import { FC, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";

import postImageUserProfile from "@src/api/image/user/postImageUserProfile";
import postUser from "@src/api/user/postUser";
import FormTextLabel from "@src/components/form/text/FormTextLabel";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import { ImageInputValue } from "@src/types/image";
import convertFileToFormData from "@src/utils/convertFileToFormData";
import FormInputAvatarImageEditor from "@src/components/form/input/FormInputAvatarImageEditor";
import FormTextNotice from "@src/components/form/text/FormTextNotice";
import FormInputText from "@src/components/form/input/FormInputText";
import FormTextError from "@src/components/form/text/FormTextError";
import LayoutFooterMaxWidthButton from "@src/components/layout/footer/LayoutFooterMaxWidthButton";

import STYLE from "./user.add.form.module.scss";

interface UserAddFormFields {
  username: string;
  profile_image: ImageInputValue | null;
}

const UserAddForm: FC = () => {
  const { replace } = useRouter();

  const { mutateAsync: uploadImage } = useMutation({
    mutationFn: postImageUserProfile,
  });

  const { mutate: addUser } = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      replace("/treasure");
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserAddFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onValid = useCallback<SubmitHandler<UserAddFormFields>>(
    async ({ username, profile_image }) => {
      if (!username) return;

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

      addUser({ username, profile_image: src });
    },
    [addUser, uploadImage]
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

export default UserAddForm;
