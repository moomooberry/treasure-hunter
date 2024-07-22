"use client";

import { FC, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSwiper } from "swiper/react";
import { useMutation } from "@tanstack/react-query";
import { useFormContext, useWatch } from "react-hook-form";
import { v4 } from "uuid";

import postImagesTmp from "@src/api/image/tmp/postImagesTmp";
import postTreasure from "@src/api/treasure/postTreasure";
import LayoutFooterSmallButton from "@src/components/layout/footer/LayoutFooterSmallButton";
import convertFileToFormData from "@src/utils/convertFileToFormData";

import type { TreasureAddFormFields } from "../../TreasureAddForm";

function validateStringImages(value: (string | File)[]): value is string[] {
  return value.every((element) => typeof element === "string");
}

const TreasureAddFormContentFooterButton: FC = () => {
  const { control, getValues, setError, setValue, trigger, handleSubmit } =
    useFormContext<TreasureAddFormFields>();

  const { replace } = useRouter();

  const swiper = useSwiper();

  const [reward, currentSlide] = useWatch({
    control,
    name: ["reward", "currentSlide"],
  });

  const { mutateAsync: uploadImagesToTmp, isPending: isUploadImagesPending } =
    useMutation({
      mutationFn: postImagesTmp,
    });

  const { mutate: addTreasure } = useMutation({
    mutationFn: postTreasure,
    onSuccess: () => {
      replace("/treasure");
    },
  });

  const buttonText = useMemo(() => {
    if (currentSlide === "info" && reward) return "결제하기";
    if (currentSlide === "position" || currentSlide === "image") return "다음";
    return "저장하기";
  }, [currentSlide, reward]);

  const onButtonClick = useCallback(async () => {
    /* 1. Handle Image Slide */
    if (currentSlide === "image") {
      const images = getValues("images");
      if (!images.length) {
        setError("images", {
          types: {
            required: "이미지를 반드시 등록해 주셔야 해요.",
          },
        });
        return;
      }
      const fileList: File[] = [];
      const stringList: string[] = [];
      images.forEach(({ src }) => {
        if (typeof src === "string") {
          stringList.push(src);
        } else {
          fileList.push(src);
        }
      });
      if (fileList.length > 0) {
        const formDataList = convertFileToFormData(fileList);
        uploadImagesToTmp({ formDataList }).then((pathList) => {
          const newStringList = pathList.map(({ path }) => path);
          stringList.push(...newStringList);
          const newImagesList = stringList.map((src) => ({ id: v4(), src }));
          setValue("images", newImagesList);
        });
      }
    }

    /* 2. Handle Info Slide */
    if (currentSlide === "info") {
      const isValid = await trigger(["title", "hint", "reward"]);

      if (!isValid) return;

      const reward = getValues("reward");

      if (!reward) {
        handleSubmit(({ title, hint, images, position }) => {
          const srcList = images.map(({ src }) => src);
          const isStringList = validateStringImages(srcList);

          if (!isStringList) return;

          addTreasure({
            title,
            hint,
            images: srcList,
            lat: position.lat,
            lng: position.lng,
            reward: null,
          });
        })();

        return;
      }
    }

    swiper.slideNext(230);
  }, [
    addTreasure,
    currentSlide,
    getValues,
    handleSubmit,
    setError,
    setValue,
    swiper,
    trigger,
    uploadImagesToTmp,
  ]);

  return (
    <LayoutFooterSmallButton
      disabled={currentSlide === "info" && isUploadImagesPending}
      onClick={onButtonClick}
    >
      {buttonText}
    </LayoutFooterSmallButton>
  );
};

export default TreasureAddFormContentFooterButton;
