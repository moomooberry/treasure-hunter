import { FC, FormEventHandler, useCallback } from "react";
import Image from "next/image";
import { v4 } from "uuid";

import { ImageInputValue } from "@src/types/image";

import RedCircleCloseIcon from "../icons/RedCircleCloseIcon";
import CameraIcon from "../icons/CameraIcon";

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
        <div key={item.id} className={STYLE.__form_image_box}>
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
    </div>
  );
};

export default FormInputImage;
