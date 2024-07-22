"use client";

import { FC, MouseEventHandler, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useFormContext, useFormState } from "react-hook-form";

import Lottie from "@src/components/lottie/Lottie";
import tremblingMarkerSrc from "@src/assets/lottie/trembling_marker.json";
import scanningImageSrc from "@src/assets/lottie/scanning_image.json";
import exclamationMarkSrc from "@src/assets/lottie/exclamation_mark.json";
import movingQuillSrc from "@src/assets/lottie/moving_quill.json";
import type { ButtonProps } from "@src/components/button/Button";

import type { TreasureAddFormFields } from "..";

import STYLE from "./treasure.add.form.error.modal.module.scss";

const ModalCheck = dynamic(() => import("@src/components/modal/ModalCheck"));

const TreasureAddFormErrorModal: FC = () => {
  const { back } = useRouter();

  const { control, clearErrors } = useFormContext<TreasureAddFormFields>();

  const { errors } = useFormState({ control });

  const clearAllErrors = useCallback(() => {
    clearErrors();
  }, [clearErrors]);

  const routeBack = useCallback(() => {
    back();
  }, [back]);

  const animationData = useMemo(() => {
    if (errors.position) return tremblingMarkerSrc;
    if (errors.images) return scanningImageSrc;
    if (errors.title || errors.hint || errors.reward) return movingQuillSrc;
    if (errors.currentSlide) return exclamationMarkSrc;
  }, [
    errors.hint,
    errors.images,
    errors.position,
    errors.reward,
    errors.currentSlide,
    errors.title,
  ]);

  const buttons: Array<{
    text: string;
    variant?: ButtonProps["variant"];
    onClick: MouseEventHandler<HTMLButtonElement>;
  }> = useMemo(() => {
    if (errors.currentSlide?.types?.isEnd) {
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

    return [
      {
        text: "확인",
        onClick: clearAllErrors,
        variant: "cancel",
      },
    ];
  }, [clearAllErrors, errors.currentSlide, routeBack]);

  return (
    <ModalCheck
      isOpen={
        !!errors.position ||
        !!errors.images ||
        !!errors.title ||
        !!errors.hint ||
        !!errors.reward ||
        !!errors.currentSlide
      }
      onClose={clearAllErrors}
      title="확인해주세요!"
      buttons={buttons}
    >
      <div className={STYLE.__form_map_modal_wrapper}>
        <div className={STYLE.__form_map_modal_lottie_wrapper}>
          <Lottie animationData={animationData} width="180px" height="180px" />
        </div>

        <div className={STYLE.__form_map_modal_error_wrapper}>
          {errors.currentSlide?.types?.isEnd && (
            <div className={STYLE.__form_map_modal_error}>
              {errors.currentSlide.types.isEnd}
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

export default TreasureAddFormErrorModal;
