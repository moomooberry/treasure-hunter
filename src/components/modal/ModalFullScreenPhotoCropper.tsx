"use client";

import { FC, useCallback, useRef } from "react";
import { Area } from "react-easy-crop";

import LayoutFooterMaxWidthButton from "@src/components/layout/footer/LayoutFooterMaxWidthButton";
import LayoutHeaderContainer from "@src/components/layout/header/_components/LayoutHeaderContainer";
import LayoutHeaderRoundButton from "@src/components/layout/header/_components/LayoutHeaderRoundButton";
import PhotoCropper, {
  PhotoCropperProps,
} from "@src/components/photo/PhotoCropper";
import CloseIcon from "@src/components/icons/CloseIcon";

import ModalFullScreenContainer, {
  ModalFullScreenContainerProps,
} from "./_components/ModalFullScreenContainer";

type ModalFullScreenPhotoCropperProps = ModalFullScreenContainerProps &
  Omit<PhotoCropperProps, "onCropComplete"> & {
    onCrop: (value: File) => void;
  };

const ModalFullScreenPhotoCropper: FC<ModalFullScreenPhotoCropperProps> = ({
  isOpen,
  onClose,
  backgroundColor,

  image,
  onCrop,
}) => {
  const croppedAreaPixelsRef = useRef<Area>();

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    croppedAreaPixelsRef.current = croppedAreaPixels;
  }, []);

  const onCropButtonClick = useCallback(async () => {
    const croppedAreaPixels = croppedAreaPixelsRef.current;

    if (!croppedAreaPixels) return;

    const createImage = (url: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
      });

    const img = await createImage(image);

    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    const uri = canvas.toDataURL("image/jpeg");
    const binary = atob(uri.split(",")[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    const blob = new Blob([new Uint8Array(array)], {
      type: "image/jpeg",
    });

    const file = new File([blob], "crop_image", { type: "image/jpeg" });

    onCrop(file);
    onClose();
  }, [image, onClose, onCrop]);

  return (
    <ModalFullScreenContainer
      isOpen={isOpen}
      onClose={onClose}
      backgroundColor={backgroundColor}
    >
      <LayoutHeaderContainer backgroundColor="transparent">
        <LayoutHeaderRoundButton onClick={onClose}>
          <CloseIcon width="14px" height="14px" />
        </LayoutHeaderRoundButton>
      </LayoutHeaderContainer>

      <PhotoCropper image={image} onCropComplete={onCropComplete} />

      <LayoutFooterMaxWidthButton onClick={onCropButtonClick}>
        자르기
      </LayoutFooterMaxWidthButton>
    </ModalFullScreenContainer>
  );
};

export default ModalFullScreenPhotoCropper;
