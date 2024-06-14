"use client";

import { FC, useCallback } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { SubmitHandler, UseFormRegisterReturn, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { v4 } from "uuid";

import { Position } from "@src/types/position";
import getTreasure from "@src/api/treasure/getTreasure";
import postTreasure from "@src/api/treasure/postTreasure";
import putTreasure from "@src/api/treasure/putTreasure";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import convertFileToFormData from "@src/utils/convertFileToFormData";
import postImageTreasure from "@src/api/image/treasure/postImageTreasure";
import { FormImageInputError } from "@src/components/form/FormInputImage";

import TreasureFormView, {
  TreasureFormFields,
  TreasureFormViewProps,
} from "./TreasureFormView";

const TreasureFormController: FC = () => {
  const { push, replace, back } = useRouter();

  const { treasure_id } = useParams();

  const pathname = usePathname();

  const step = (useSearchParams().get("step") as "1" | "2") ?? "1";

  const { mutateAsync: uploadImageAsync } = useMutation({
    mutationFn: postImageTreasure,
  });

  const { mutate: addTreasure } = useMutation({
    mutationFn: postTreasure,
    onSuccess: () => {
      replace("/treasure");
    },
  });

  const { mutate: editTreasure } = useMutation({
    mutationFn: putTreasure,
    onSuccess: () => {
      back();
    },
  });

  const { data } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
    queryFn: () => getTreasure({ treasure_id: treasure_id as string }),
    enabled: !!treasure_id,
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TreasureFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      images: data ? data.images.map((src) => ({ id: v4(), src })) : [],
      title: data?.title,
      hint: data?.hint,
      position: data ? { lat: data.lat, lng: data.lng } : undefined,
      reward: data?.reward ? data.reward.toString() : undefined,
    },
  });

  const registerProps: {
    [k in keyof TreasureFormFields]?: UseFormRegisterReturn;
  } = {
    title: register("title", {
      required: {
        value: true,
        message: "최대 20자로 제목을 입력해주세요.",
      },
    }),
    hint: register("hint", {
      required: {
        value: true,
        message: "최대 300자로 힌트를 입력해주세요.",
      },
    }),
    reward: register("reward", {
      pattern: {
        value: /^\d+$/,
        message: "숫자만 입력해주세요.",
      },
      max: {
        value: 1000000,
        message: "최대 100만원까지만 입력 가능합니다.",
      },
    }),
  };

  const clearImageError = useCallback(() => {
    clearErrors("images");
  }, [clearErrors]);

  const clearPositionError = useCallback(() => {
    clearErrors("position");
  }, [clearErrors]);

  const onNextStepClick = useCallback(() => {
    push(`${pathname}?step=${2}`);
  }, [pathname, push]);

  const onPosition = useCallback(
    (value: Position) => {
      setValue("position", value);
    },
    [setValue]
  );

  const onPositionError = useCallback(() => {
    setError("position", {
      types: {
        isOverBuffer: "현재 위치랑 먼 곳에 숨기려 하는데 괜찮으시겠어요?",
      },
    });
  }, [setError]);

  const onImageError = useCallback(
    (value: FormImageInputError) => {
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

  const onSubmit = useCallback<SubmitHandler<TreasureFormFields>>(
    async ({ position, hint, images, title, reward }) => {
      if (images.length === 0) {
        setError("images", {
          types: {
            required: "이미지를 반드시 등록해 주셔야 해요.",
          },
        });
        return;
      }

      const stringList: string[] = [];
      const fileList: File[] = [];

      images.forEach(({ src }) => {
        if (typeof src === "string") {
          stringList.push(src);
        } else {
          fileList.push(src);
        }
      });

      if (fileList.length > 0) {
        const formDataList = convertFileToFormData(fileList);
        for (let i = 0; i < formDataList.length; i++) {
          const { path } = await uploadImageAsync({
            formData: formDataList[i],
          });
          stringList.push(path);
        }
      }

      if (typeof treasure_id !== "string") {
        addTreasure({
          title,
          hint,
          images: stringList,
          lat: position.lat,
          lng: position.lng,
          reward: reward ? Number(reward) : null,
        });
      } else {
        editTreasure({
          treasure_id,
          title,
          hint,
          images: stringList,
        });
      }
    },
    [addTreasure, editTreasure, setError, treasure_id, uploadImageAsync]
  );

  const viewProps: TreasureFormViewProps = {
    treasure_id: treasure_id as string,
    pathname,
    step,

    control,
    registerProps,
    errors,

    clearImageError,
    clearPositionError,

    onPositionError,
    onImageError,
    onPosition,
    onNextStepClick,
    onSubmitClick: handleSubmit(onSubmit),
  };

  return <TreasureFormView {...viewProps} />;
};

export default TreasureFormController;
