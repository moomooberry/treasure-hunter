"use client";

import { FC, useCallback, useRef } from "react";
import { Area } from "react-easy-crop";

import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import CloseIcon from "@src/components/icons/CloseIcon";
import LayoutHeader from "@src/components/layout/header";
import LayoutFooter from "@src/components/layout/footer";
import Cropper, { CropperProps } from "@src/components/cropper";

import ModalFullScreen, { ModalFullScreenProps } from ".";

type ModalFullScreenCropperProps = ModalFullScreenProps &
  Omit<CropperProps, "onCropComplete"> & {
    onCrop: (value: File) => void;
  };

const ModalFullScreenCropper: FC<ModalFullScreenCropperProps> = ({
  isOpen,
  onClose,
  backgroundColor,

  image,
  onCrop,
}) => {
  const { top, bottom } = useReduxSelector((state) => state.reduxDevice.device);

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
    <ModalFullScreen
      isOpen={isOpen}
      onClose={onClose}
      backgroundColor={backgroundColor}
    >
      <LayoutHeader backgroundColor="transparent">
        <LayoutHeader.Option.RoundButton onClick={onClose}>
          <CloseIcon width="14px" height="14px" />
        </LayoutHeader.Option.RoundButton>
      </LayoutHeader>

      <Cropper image={image} onCropComplete={onCropComplete} />

      <LayoutFooter.MaxWidthButton onClick={onCropButtonClick}>
        자르기
      </LayoutFooter.MaxWidthButton>
    </ModalFullScreen>
  );
};

export default ModalFullScreenCropper;
