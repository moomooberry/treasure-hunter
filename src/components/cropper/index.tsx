"use client";

import { FC, useState } from "react";
import ReactCropper, { Area } from "react-easy-crop";

export interface CropperProps {
  image: string;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
}

const Cropper: FC<CropperProps> = ({ image, onCropComplete }) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);

  return (
    <ReactCropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={1}
      cropShape="round"
      onCropChange={setCrop}
      onZoomChange={setZoom}
      onCropComplete={onCropComplete}
    />
  );
};

export default Cropper;
