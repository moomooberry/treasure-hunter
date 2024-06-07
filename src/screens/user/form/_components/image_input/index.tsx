"use client";

import { FC, FormEventHandler, useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { v4 } from "uuid";
import classNames from "classnames";

import { ImageInputValue } from "@src/types/image";
import anonymousImgSrc from "@src/assets/webp/anonymous_512_512.webp";
import ScissorIcon from "@src/components/icons/ScissorIcon";
import ModalCommonCheck from "@src/components/modal/common/ModalCommonCheck";
import ModalFullScreenCropper from "@src/components/modal/full_screen/ModalFullScreenCropper";

import STYLE from "./user.form.image.input.module.scss";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  show: {
    opacity: 1,
    x: 0,
  },
};

const cropButtonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

function getImageUrl(value: string | File) {
  return typeof value === "string" ? value : URL.createObjectURL(value);
}

interface UserFormImageInputProps {
  value: ImageInputValue | null;
  onChange: (value: ImageInputValue | null) => void;
  maxSize?: number;
}

const UserFormImageInput: FC<UserFormImageInputProps> = ({
  value,
  onChange,
  maxSize = 20971520, // -> 20mb
}) => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const onImageChange = useCallback<FormEventHandler<HTMLInputElement>>(
    (event) => {
      const { files } = event.currentTarget;

      if (!files) return;

      const file = files.item(0);

      if (!file) return;

      if (file.size <= maxSize) {
        onChange({ id: v4(), src: file });
      } else {
        setIsErrorModalOpen(true);
      }

      event.currentTarget.value = "";
    },
    [maxSize, onChange]
  );

  const onBasicImageClick = useCallback(() => {
    if (!value) return;

    onChange(null);
  }, [onChange, value]);

  const onCropButtonClick = useCallback(() => {
    setIsCropModalOpen(true);
  }, []);

  const onCrop = useCallback(
    (value: File) => {
      onChange({ id: v4(), src: value });
    },
    [onChange]
  );

  const closeErrorModal = useCallback(() => {
    setIsErrorModalOpen(false);
  }, []);

  const closeCropModal = useCallback(() => {
    setIsCropModalOpen(false);
  }, []);

  return (
    <div className={STYLE.__container}>
      <div
        className={classNames({
          [STYLE.__profile_image_wrapper]: true,
          [STYLE.__profile_image_wrapper_relative]: true,
        })}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={value?.id ?? "no_profile"}
            className={classNames({
              [STYLE.__profile_image_wrapper]: true,
              [STYLE.__profile_image_wrapper_absolute]: true,
            })}
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            transition={{
              x: {
                type: "spring",
                stiffness: 200,
                damping: 15,
              },
            }}
          >
            <Image
              priority
              src={value ? getImageUrl(value.src) : anonymousImgSrc}
              alt="user_profile"
              fill
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className={STYLE.__list_wrapper}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.button
          className={STYLE.__list_button}
          variants={itemVariants}
          onClick={onBasicImageClick}
        >
          기본 이미지
        </motion.button>

        <motion.label className={STYLE.__list_button} variants={itemVariants}>
          이미지 {value ? "수정" : "추가"}
          <input
            type="file"
            accept="image/*"
            multiple={false}
            onChange={onImageChange}
            style={{ display: "none" }}
          />
        </motion.label>

        <AnimatePresence>
          {value && (
            <motion.button
              className={STYLE.__list_crop_button}
              variants={cropButtonVariants}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={onCropButtonClick}
            >
              <ScissorIcon width="20px" height="20px" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <ModalCommonCheck
        isOpen={isErrorModalOpen}
        title="이미지가 20mb를 초과했어요."
        onClose={closeErrorModal}
        buttons={[{ text: "확인", onClick: closeErrorModal }]}
      />

      {value && (
        <ModalFullScreenCropper
          isOpen={isCropModalOpen}
          onClose={closeCropModal}
          image={getImageUrl(value.src)}
          onCrop={onCrop}
        />
      )}
    </div>
  );
};

export default UserFormImageInput;
