"use client";

import { FC, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { UseFormReturn, useWatch } from "react-hook-form";
import { SwiperClass } from "swiper/react";
import { useMutation } from "@tanstack/react-query";
import { v4 } from "uuid";

import LayoutFooter from "@src/components/layout/footer";
import postImagesTmp from "@src/api/image/tmp/postImagesTmp";
import convertFileToFormData from "@src/utils/convertFileToFormData";
import postTreasure from "@src/api/treasure/postTreasure";
import putTreasure from "@src/api/treasure/putTreasure";

import { TreasureFormFields } from "../TreasureFormView";

interface TreasureFormFooterButtonProps {
  swiper: SwiperClass;
  formMethods: UseFormReturn<TreasureFormFields>;
}

function validateStringImages(value: (string | File)[]): value is string[] {
  return value.every((element) => typeof element === "string");
}

const TreasureFormFooterButton: FC<TreasureFormFooterButtonProps> = ({
  swiper,
  formMethods: {
    control,
    setError,
    getValues,
    trigger,
    setValue,
    handleSubmit,
  },
}) => {
  const { replace, back } = useRouter();

  const { treasure_id } = useParams();

  const [rewardValue, slideIndexValue, imagesValue] = useWatch({
    control,
    name: ["reward", "slideIndex", "images"],
  });

  console.log("imagesValue", imagesValue);

  const buttonText = useMemo(() => {
    if (
      (treasure_id && slideIndexValue === 1) ||
      (!treasure_id && slideIndexValue === 2 && !rewardValue)
    ) {
      return "저장하기";
    }

    if (!treasure_id && slideIndexValue == 3) {
      return "결제하기";
    }

    return "다음";
  }, [rewardValue, slideIndexValue, treasure_id]);

  // TODO error처리 안됨
  const onError = useCallback(() => {
    setError("root", { message: "서버 에러입니다. 다시 시작해주세요." });
  }, [setError]);

  const { mutateAsync: uploadImagesToTmp, isPending: isUploadImagesPending } =
    useMutation({
      mutationFn: postImagesTmp,
      onError,
    });

  const { mutate: addTreasure } = useMutation({
    mutationFn: postTreasure,
    onSuccess: () => {
      replace("/treasure");
    },
    onError,
  });

  const { mutate: editTreasure } = useMutation({
    mutationFn: putTreasure,
    onSuccess: () => {
      back();
    },
    onError,
  });

  const buttonDisabled = useMemo(() => {
    if (treasure_id) return slideIndexValue === 1 && isUploadImagesPending;

    return slideIndexValue === 2 && isUploadImagesPending;
  }, [slideIndexValue, treasure_id, isUploadImagesPending]);

  const onClick = useCallback(async () => {
    const isImageStep =
      (treasure_id && slideIndexValue === 0) ||
      (!treasure_id && slideIndexValue === 1);

    const isInfoStep =
      (treasure_id && slideIndexValue === 1) ||
      (!treasure_id && slideIndexValue === 2);

    const isPaymentStep = !treasure_id && slideIndexValue === 3;

    // For Image
    if (isImageStep) {
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

    // For Info
    if (isInfoStep) {
      const isValid = await trigger(["title", "hint", "reward"]);

      if (!isValid) return;

      const reward = getValues("reward");

      if (treasure_id || (!treasure_id && !reward)) {
        handleSubmit(({ title, hint, images, position, reward }) => {
          const srcList = images.map(({ src }) => src);
          const isStringList = validateStringImages(srcList);

          if (!isStringList) return;

          if (typeof treasure_id !== "string") {
            addTreasure({
              title,
              hint,
              images: srcList,
              lat: position.lat,
              lng: position.lng,
              reward: null,
            });
          } else {
            editTreasure({
              title,
              hint,
              images: srcList,
              treasure_id,
            });
          }
        })();

        return;
      }
    }

    // For Payment
    if (isPaymentStep) {
      console.log("payment");

      return;
    }

    swiper.slideNext(230);
  }, [
    addTreasure,
    editTreasure,
    getValues,
    handleSubmit,
    setError,
    setValue,
    slideIndexValue,
    swiper,
    treasure_id,
    trigger,
    uploadImagesToTmp,
  ]);

  return (
    <LayoutFooter.SmallButton disabled={buttonDisabled} onClick={onClick}>
      {buttonText}
    </LayoutFooter.SmallButton>
  );
};

export default TreasureFormFooterButton;
