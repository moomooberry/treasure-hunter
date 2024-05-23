"use client";

import { TreasureMap } from "@src/libs/google-map";
import { Position } from "@src/types/position";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import { SubmitHandler, UseFormRegisterReturn, useForm } from "react-hook-form";
import TreasureFormView, {
  TreasureFormFields,
  TreasureFormViewProps,
} from "./TreasureFormView";
import { useMutation, useQuery } from "@tanstack/react-query";
import getTreasure from "@src/api/treasure/getTreasure";
import { v4 } from "uuid";
import postTreasure from "@src/api/treasure/postTreasure";
import putTreasure from "@src/api/treasure/putTreasure";
// import getUser from "@src/api/user/_client/getUser";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";

interface TreasureFormControllerProps {
  treasureId?: string;
}

const TreasureFormController: FC<TreasureFormControllerProps> = ({
  treasureId,
}) => {
  const { push, replace, back } = useRouter();

  const [error, setError] = useState<TreasureMap["_error"]>({
    isOverBuffer: false,
  });

  const pathname = usePathname();

  const step = (useSearchParams().get("step") as "1" | "2") ?? "1";

  const { mutate: addMutate } = useMutation({
    mutationFn: postTreasure,
    onSuccess: () => {
      replace("/treasure");
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: putTreasure,
    onSuccess: () => {
      back();
    },
  });

  const { data } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { treasureId }],
    queryFn: () => getTreasure({ treasureId: treasureId as string }),
    enabled: !!treasureId,
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<TreasureFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      images: data ? data.imgSrc.map((src) => ({ id: v4(), src })) : [],
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

  const onNextStepClick = useCallback(() => {
    push(`${pathname}?step=${2}`);
  }, [pathname, push]);

  const onPosition = useCallback(
    (value: Position) => {
      setValue("position", value);
    },
    [setValue]
  );

  const onError = useCallback((value: TreasureMap["_error"]) => {
    setError(value);
  }, []);

  const onSubmit = useCallback<SubmitHandler<TreasureFormFields>>(
    ({ position, hint, images, title, reward }) => {
      // TODO images string 으로 post
      if (!treasureId) {
        addMutate({
          title,
          hint,
          imgSrc: [
            "https://picsum.photos/200",
            "https://picsum.photos/200",
            "https://picsum.photos/200",
          ],
          lat: position.lat,
          lng: position.lng,
          reward: reward ? Number(reward) : null,
        });
      } else {
        editMutate({
          treasureId,
          title,
          hint,
          imgSrc: [
            "https://picsum.photos/200",
            "https://picsum.photos/200",
            "https://picsum.photos/200",
          ],
        });
      }
    },
    [addMutate, editMutate, treasureId]
  );

  useEffect(() => {
    if (error.isOverBuffer) {
      alert("현재 위치랑 먼 곳에 숨기려 하는데 괜찮으시겠어요?");
    }
  }, [error]);

  const viewProps: TreasureFormViewProps = {
    treasureId,
    step,
    control,
    registerProps,
    errors,

    onError,
    onPosition,
    onNextStepClick,
    onSubmitClick: handleSubmit(onSubmit),
  };

  return <TreasureFormView {...viewProps} />;
};

export default TreasureFormController;
