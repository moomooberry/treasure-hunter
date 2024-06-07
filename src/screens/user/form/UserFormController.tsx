"use client";

import { FC, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";

import { useMutation, useQuery } from "@tanstack/react-query";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";
import postImageUserProfile from "@src/api/image/user/postImageUserProfile";
import putUser from "@src/api/user/putUser";
import convertFileToFormData from "@src/utils/convertFileToFormData";

import UserFormView, {
  UserFormFields,
  UserFormViewProps,
} from "./UserFormView";
import postUser from "@src/api/user/postUser";

interface UserFormControllerProps {
  isEdit: boolean;
}

const UserFormController: FC<UserFormControllerProps> = ({ isEdit }) => {
  const { back, replace } = useRouter();

  const { data } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
    enabled: isEdit,
  });

  const { mutateAsync: uploadImage } = useMutation({
    mutationFn: postImageUserProfile,
  });

  const { mutate: addUser } = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      replace("/treasure");
    },
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
  } = useForm<UserFormFields>({
    defaultValues: {
      profile_image: data?.profile_image
        ? { id: v4(), src: data.profile_image }
        : null,
      username: data?.username,
    },
  });

  const onValid = useCallback<SubmitHandler<UserFormFields>>(
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

      if (isEdit) {
        editUser({ username, profile_image: src });
      } else {
        addUser({ username, profile_image: src });
      }
    },

    [addUser, editUser, isEdit, uploadImage]
  );

  const viewProps: UserFormViewProps = {
    data,
    control,
    registerProps: {
      username: register("username"),
    },
    errors,
    onSubmitClick: handleSubmit(onValid),
  };

  return <UserFormView {...viewProps} />;
};

export default UserFormController;
