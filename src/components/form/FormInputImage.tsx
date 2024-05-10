import { FC, FormEventHandler, useCallback } from "react";
import Image from "next/image";
import { v4 } from "uuid";
import cameraImgSrc from "@src/assets/webp/camera_2133_2133.webp";
import closeImgSrc from "@src/assets/webp/close_red_circle_512_512.webp";
import { ImageInputValue } from "@src/types/image";

import STYLE from "./form.module.scss";

interface FormImageInputProps {
  value: ImageInputValue[];
  onChange: (value: ImageInputValue[]) => void;

  maxSize?: number; // -> byte
  maxLength?: number;
  paddingX?: string;
}

const FormInputImage: FC<FormImageInputProps> = ({
  value,
  onChange,

  maxLength = 5,
  paddingX = "12px",
  maxSize = 20971520, // -> 20mb
}) => {
  const onImageChange = useCallback<FormEventHandler<HTMLInputElement>>(
    (event) => {
      const { files } = event.currentTarget;
      if (!files) return;

      let sizeError = false;

      const result: ImageInputValue[] = [];

      for (let i = 0; i < files.length; i += 1) {
        if (i + value.length > maxLength - 1) {
          // TODO maxLengthError
          break;
        }

        const file = files.item(i);

        if (file) {
          if (file.size <= maxSize) {
            result.unshift({
              id: v4(),
              src: file,
            });
          } else {
            sizeError = true;
          }
        }
      }

      onChange([...value, ...result]);
      event.currentTarget.value = "";

      if (sizeError) {
        // TODO error-size
      }
    },
    [maxLength, maxSize, onChange, value]
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
          <Image src={cameraImgSrc} alt="camera" width={24} height={24} />
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
            <Image src={closeImgSrc} alt="close" width={16} height={16} />
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

FormInputImage.displayName = "FormInputImage";