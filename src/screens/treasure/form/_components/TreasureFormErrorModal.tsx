"use client";

import { FC, MouseEventHandler, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { UseFormReturn, useFormState } from "react-hook-form";

import Lottie from "@src/components/lottie/Lottie";
import ModalCheck from "@src/components/modal/ModalCheck";
import tremblingMarkerSrc from "@src/assets/lottie/trembling_marker.json";
import scanningImageSrc from "@src/assets/lottie/scanning_image.json";
import exclamationMarkSrc from "@src/assets/lottie/exclamation_mark.json";
import redExclamationMarkSrc from "@src/assets/lottie/exclamation_mark_red.json";
import movingQuillSrc from "@src/assets/lottie/moving_quill.json";
import type { ButtonProps } from "@src/components/button/Button";
import type { TreasureFormFields } from "../TreasureFormView";

import STYLE from "../treasure.form.module.scss";

interface TreasureFormErrorModalProps {
  formMethods: UseFormReturn<TreasureFormFields>;
}

const TreasureFormErrorModal: FC<TreasureFormErrorModalProps> = ({
  formMethods: { control, clearErrors },
}) => {
  const { back, refresh } = useRouter();

  const { errors } = useFormState({ control });

  const clearAllErrors = useCallback(() => {
    clearErrors();
  }, [clearErrors]);

  const routeBack = useCallback(() => {
    back();
  }, [back]);

  const refreshPage = useCallback(() => {
    clearAllErrors();
    refresh();
  }, [clearAllErrors, refresh]);

  const animationData = useMemo(() => {
    if (errors.position) return tremblingMarkerSrc;
    if (errors.images) return scanningImageSrc;
    if (errors.title || errors.hint || errors.reward) return movingQuillSrc;
    if (errors.slideIndex) return exclamationMarkSrc;
    if (errors.root) return redExclamationMarkSrc;
  }, [
    errors.hint,
    errors.images,
    errors.position,
    errors.reward,
    errors.root,
    errors.slideIndex,
    errors.title,
  ]);

  const buttons: Array<{
    text: string;
    variant?: ButtonProps["variant"];
    onClick: MouseEventHandler<HTMLButtonElement>;
  }> = useMemo(() => {
    if (errors.slideIndex?.types?.isEnd) {
      return [
        {
          text: "취소",
          onClick: clearAllErrors,
          variant: "cancel",
        },
        {
          text: "네",
          onClick: routeBack,
          variant: "common",
        },
      ];
    }

    if (errors.root) {
      return [
        {
          text: "새로고침",
          onClick: refreshPage,
          variant: "cancel",
        },
      ];
    }

    return [
      {
        text: "확인",
        onClick: clearAllErrors,
        variant: "cancel",
      },
    ];
  }, [clearAllErrors, errors.root, errors.slideIndex, refreshPage, routeBack]);

  return (
    <ModalCheck
      isOpen={
        !!errors.root ||
        !!errors.position ||
        !!errors.images ||
        !!errors.title ||
        !!errors.hint ||
        !!errors.reward ||
        !!errors.slideIndex
      }
      onClose={clearAllErrors}
      title={errors.root ? "에러 발생" : "확인해주세요!"}
      buttons={buttons}
    >
      <div className={STYLE.__form_map_modal_wrapper}>
        <div className={STYLE.__form_map_modal_lottie_wrapper}>
          <Lottie animationData={animationData} width="180px" height="180px" />
        </div>

        <div className={STYLE.__form_map_modal_error_wrapper}>
          {errors.root && (
            <div className={STYLE.__form_map_modal_error}>
              {errors.root.message}
            </div>
          )}

          {errors.slideIndex?.types?.isEnd && (
            <div className={STYLE.__form_map_modal_error}>
              {errors.slideIndex.types.isEnd}
            </div>
          )}

          {errors.position?.types?.isOverBuffer && (
            <div className={STYLE.__form_map_modal_error}>
              {errors.position.types.isOverBuffer}
            </div>
          )}

          {errors.images?.types?.size && (
            <div className={STYLE.__check_modal_error}>
              {errors.images.types.size}
            </div>
          )}
          {errors.images?.types?.maxLength && (
            <div className={STYLE.__check_modal_error}>
              {errors.images.types.maxLength}
            </div>
          )}
          {errors.images?.types?.required && (
            <div className={STYLE.__check_modal_error}>
              {errors.images.types.required}
            </div>
          )}

          {errors.title?.types?.required && (
            <div className={STYLE.__check_modal_error}>
              {errors.title.types.required}
            </div>
          )}
          {errors.hint?.types?.required && (
            <div className={STYLE.__check_modal_error}>
              {errors.hint.types.required}
            </div>
          )}
          {errors.reward?.types?.pattern && (
            <div className={STYLE.__check_modal_error}>
              {errors.reward.types.pattern}
            </div>
          )}
          {errors.reward?.types?.max && (
            <div className={STYLE.__check_modal_error}>
              {errors.reward.types.max}
            </div>
          )}
        </div>
      </div>
    </ModalCheck>
  );
};

export default TreasureFormErrorModal;
