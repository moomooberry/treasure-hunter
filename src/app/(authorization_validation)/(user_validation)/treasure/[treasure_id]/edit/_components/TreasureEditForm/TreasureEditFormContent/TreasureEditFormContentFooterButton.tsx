"use client";

import { FC, useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSwiper } from "swiper/react";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { v4 } from "uuid";

import postImagesTmp from "@src/api/image/tmp/postImagesTmp";
import putTreasure from "@src/api/treasure/putTreasure";
import convertFileToFormData from "@src/utils/convertFileToFormData";
import LayoutFooterSmallButton from "@src/components/layout/footer/LayoutFooterSmallButton";

import type { TreasureEditFormFields } from "..";

function validateStringImages(value: (string | File)[]): value is string[] {
  return value.every((element) => typeof element === "string");
}

const TreasureEditFormContentFooterButton: FC = () => {
  const { control, getValues, setError, setValue, trigger, handleSubmit } =
    useFormContext<TreasureEditFormFields>();

  const { treasure_id } = useParams();

  const swiper = useSwiper();

  const { back } = useRouter();

  const currentSlide = useWatch({ control, name: "currentSlide" });

  const { mutateAsync: uploadImagesToTmp, isPending: isUploadImagesPending } =
    useMutation({
      mutationFn: postImagesTmp,
    });

  const { mutate: editTreasure } = useMutation({
    mutationFn: putTreasure,
    onSuccess: () => {
      back();
    },
  });

  const onButtonClick = useCallback(async () => {
    if (typeof treasure_id !== "string") return;

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

    if (currentSlide === "info") {
      const isValid = await trigger(["title", "hint", "reward"]);

      if (!isValid) return;

      handleSubmit(({ title, hint, images }) => {
        const srcList = images.map(({ src }) => src);
        const isStringList = validateStringImages(srcList);

        if (!isStringList) return;

        editTreasure({
          treasure_id,
          title,
          hint,
          images: srcList,
        });
      })();

      return;
    }

    swiper.slideNext(230);
  }, [
    currentSlide,
    editTreasure,
    getValues,
    handleSubmit,
    setError,
    setValue,
    swiper,
    treasure_id,
    trigger,
    uploadImagesToTmp,
  ]);

  return (
    <LayoutFooterSmallButton
      disabled={currentSlide === "info" && isUploadImagesPending}
      onClick={onButtonClick}
    >
      {currentSlide === "info" ? "저장하기" : "다음"}
    </LayoutFooterSmallButton>
  );
};

export default TreasureEditFormContentFooterButton;
