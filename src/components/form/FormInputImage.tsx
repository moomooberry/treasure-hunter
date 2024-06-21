import { FC, FormEventHandler, useCallback, useState } from "react";
import Image from "next/image";
import { v4 } from "uuid";

import { ImageInputValue } from "@src/types/image";
import RedCircleCloseIcon from "@src/components/icons/RedCircleCloseIcon";
import CameraIcon from "@src/components/icons/CameraIcon";
import ModalFullScreenLayoutCropper from "@src/components/modal/full_screen/ModalFullScreenLayoutCropper";
import ModalFullScreenLayoutImage from "@src/components/modal/full_screen/ModalFullScreenLayoutImage";

import STYLE from "./form.module.scss";

export interface FormImageInputError {
  isMaxLengthError?: boolean;
  isSizeError?: boolean;
}

interface FormImageInputProps {
  value: ImageInputValue[];

  onChange: (value: ImageInputValue[]) => void;
  onError?: (value: FormImageInputError) => void;

  maxSize?: number; // -> byte
  maxLength?: number;
  paddingX?: string;
}

const FormInputImage: FC<FormImageInputProps> = ({
  value,

  onChange,
  onError,

  maxLength = 5,
  paddingX = "12px",
  maxSize = 20971520, // -> 20mb
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
        paddingLeft: `${paddingX}`,
        paddingRight: `${paddingX}`,
      }}
    >
      <label className={STYLE.__form_image_input_label}>
        <div className={STYLE.__form_image_input_wrapper}>
          <CameraIcon color="#b2bec3" />
          {value.length}/{maxLength}
        </div>
        <input
          className={STYLE.__form_image_input}
          type="file"
          accept="image/*"
          multiple
          onChange={onImageChange}
        />
      </label>

      {value.map((item, index) => (
        <div
          key={item.id}
          className={STYLE.__form_image_box}
          onClick={openImageModal(index)}
        >
          <button
            className={STYLE.__form_image_wrapper_button}
            onClick={onDeleteClick(index)}
          >
            <RedCircleCloseIcon width="16px" height="16px" />
          </button>

          <div className={STYLE.__form_image_wrapper}>
            <Image
              src={getImageSrc(item.src)}
              alt={`image_${index}`}
              width={60}
              height={60}
            />
          </div>
        </div>
      ))}

      {typeof imageIndex === "number" && (
        <>
          <ModalFullScreenLayoutImage
            isOpen={isImageModalOpen}
            onClose={closeImageModal}
            image={getImageSrc(value[imageIndex].src)}
            backgroundColor="#000"
            options={{
              onDeleteClick: onImageModalDeleteClick,
              onEditClick: onImageModalEditClick,
            }}
          />

          <ModalFullScreenLayoutCropper
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

export default FormInputImage;
