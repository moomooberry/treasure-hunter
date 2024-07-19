"use client";

import { FC, FormEventHandler, useCallback, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";

import ModalFullScreenPhotoEditor from "@src/components/modal/ModalFullScreenPhotoEditor";
import ModalFullScreenPhotoCropper from "@src/components/modal/ModalFullScreenPhotoCropper";
import CameraIcon from "@src/components/icons/CameraIcon";
import RedCircleCloseIcon from "@src/components/icons/RedCircleCloseIcon";
import type { ImageInputValue } from "@src/types/image";

import STYLE from "../form.module.scss";

export interface FormInputImageEditorError {
  isMaxLengthError?: boolean;
  isSizeError?: boolean;
}

interface FormInputImageEditorProps {
  value: ImageInputValue[];

  onChange: (value: ImageInputValue[]) => void;
  onError?: (value: FormInputImageEditorError) => void;

  maxSize?: number; // -> byte
  maxLength?: number;
  paddingX?: string;
  width?: string;
}

const FormInputImageEditor: FC<FormInputImageEditorProps> = ({
  value,
  onChange,
  onError,

  maxLength = 10,
  maxSize = 20971520, // -> 20mb
  paddingX = "12px",
  width = "300px",
}) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [isCropperModalOpen, setIsCropperModalOpen] = useState(false);

  const [imageIndex, setImageIndex] = useState<number | null>(null);

  const onImageChange = useCallback<FormEventHandler<HTMLInputElement>>(
    (event) => {
      const { files } = event.currentTarget;
      if (!files) return;

      let isSizeError = undefined;
      let isMaxLengthError = undefined;

      const result: ImageInputValue[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);

        if (!file) continue;

        const isFileSizeOverMax = file.size > maxSize;
        const isLengthOverMax = i + value.length > maxLength - 1;

        if (isFileSizeOverMax) {
          isSizeError = true;
        }

        if (isLengthOverMax) {
          isMaxLengthError = true;
        }

        if (!isFileSizeOverMax && !isLengthOverMax) {
          result.unshift({
            id: v4(),
            src: file,
          });
        }
      }

      onChange([...value, ...result]);

      event.currentTarget.value = "";

      if (isSizeError || isMaxLengthError) {
        onError?.({ isSizeError, isMaxLengthError });
      }
    },
    [maxLength, maxSize, onChange, onError, value]
  );

  const getImageSrc = useCallback(
    (value: string | File) =>
      typeof value === "string" ? value : URL.createObjectURL(value),
    []
  );

  const onDeleteClick = useCallback(
    (index: number) => {
      const handler = () => {
        const arr = value
          .slice(0, index)
          .concat(value.slice(index + 1, value.length));

        onChange(arr);
      };
      return handler;
    },
    [value, onChange]
  );

  const openImageModal = useCallback((index: number) => {
    const handler = () => {
      setImageIndex(index);
      setIsImageModalOpen(true);
    };
    return handler;
  }, []);

  const closeImageModal = useCallback(() => {
    setImageIndex(null);
    setIsImageModalOpen(false);
  }, []);

  const onImageModalDeleteClick = useCallback(() => {
    if (typeof imageIndex !== "number") return;

    const arr = value
      .slice(0, imageIndex)
      .concat(value.slice(imageIndex + 1, value.length));

    closeImageModal();

    onChange(arr);
  }, [imageIndex, onChange, value, closeImageModal]);

  const onImageModalEditClick = useCallback(() => {
    setIsImageModalOpen(false);
    setIsCropperModalOpen(true);
  }, []);

  const closeCropperModal = useCallback(() => {
    setImageIndex(null);
    setIsCropperModalOpen(false);
  }, []);

  const onCrop = useCallback(
    (src: File) => {
      if (typeof imageIndex !== "number") return;

      const cropImage = { id: v4(), src };
      const arr = value
        .slice(0, imageIndex)
        .concat(cropImage)
        .concat(value.slice(imageIndex + 1, value.length));

      onChange(arr);
    },
    [imageIndex, onChange, value]
  );

  return (
    <div
      className={STYLE.__form_image_container}
      style={{
        marginLeft: `-${paddingX}`,
      }}
    >
      <Swiper
        className={STYLE.__form_image_swiper_container}
        spaceBetween={12}
        centeredSlides
        slidesPerView={1.2}
        style={{
          maxWidth: width,
        }}
      >
        {value.map((item, index) => (
          <SwiperSlide
            key={item.id}
            className={STYLE.__form_image_slide_container}
          >
            <button
              className={STYLE.__form_image_slide_delete_button}
              onClick={onDeleteClick(index)}
            >
              <RedCircleCloseIcon width="30px" height="30px" />
            </button>

            <Image
              onClick={openImageModal(index)}
              src={getImageSrc(item.src)}
              alt="form_image"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}

        <SwiperSlide className={STYLE.__form_image_slide_container}>
          <label className={STYLE.__form_image_slide_label_container}>
            <div className={STYLE.__form_image_slide_label_content}>
              <CameraIcon width="40px" height="40px" color="#b2bec3" />
              {value.length}장 / {maxLength}장
            </div>
            <input
              className={STYLE.__form_image_slide_input}
              type="file"
              accept="image/*"
              multiple
              onChange={onImageChange}
            />
          </label>
        </SwiperSlide>
      </Swiper>

      {typeof imageIndex === "number" && (
        <>
          <ModalFullScreenPhotoEditor
            isOpen={isImageModalOpen}
            onClose={closeImageModal}
            image={getImageSrc(value[imageIndex].src)}
            backgroundColor="#000"
            options={{
              onDeleteClick: onImageModalDeleteClick,
              onEditClick: onImageModalEditClick,
            }}
          />

          <ModalFullScreenPhotoCropper
            isOpen={isCropperModalOpen}
            onClose={closeCropperModal}
            image={getImageSrc(value[imageIndex].src)}
            onCrop={onCrop}
            backgroundColor="#000"
          />
        </>
      )}
    </div>
  );
};

export default FormInputImageEditor;
