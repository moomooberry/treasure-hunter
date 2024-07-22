"use client";

import { FC, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useFormContext, useFormState } from "react-hook-form";

import Lottie from "@src/components/lottie/Lottie";
import scanningImageSrc from "@src/assets/lottie/scanning_image.json";
import movingQuillSrc from "@src/assets/lottie/moving_quill.json";

import type { TreasureEditFormFields } from "..";

import STYLE from "./treasure.edit.form.error.modal.module.scss";

const ModalCheck = dynamic(() => import("@src/components/modal/ModalCheck"));

const TreasureEditFormErrorModal: FC = () => {
  const { control, clearErrors } = useFormContext<TreasureEditFormFields>();

  const { errors } = useFormState({ control });

  const clearAllErrors = useCallback(() => {
    clearErrors();
  }, [clearErrors]);

  const animationData = useMemo(() => {
    if (errors.images) return scanningImageSrc;
    if (errors.title || errors.hint) return movingQuillSrc;
  }, [errors.hint, errors.images, errors.title]);

  return (
    <ModalCheck
      isOpen={!!errors.images || !!errors.title || !!errors.hint}
      onClose={clearAllErrors}
      title="확인해주세요!"
      buttons={[{ text: "확인", onClick: clearAllErrors, variant: "cancel" }]}
    >
      <div className={STYLE.__form_map_modal_wrapper}>
        <div className={STYLE.__form_map_modal_lottie_wrapper}>
          <Lottie animationData={animationData} width="180px" height="180px" />
        </div>

        <div className={STYLE.__form_map_modal_error_wrapper}>
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
        </div>
      </div>
    </ModalCheck>
  );
};

export default TreasureEditFormErrorModal;
