"use client";

import { FC } from "react";
import Image from "next/image";

import anonymousImgSrc from "@src/assets/webp/anonymous_512_512.webp";

import STYLE from "./avatar.module.scss";

interface AvatarProps {
  width?: string;
  height?: string;
  imageSrc?: string | null;
}

const Avatar: FC<AvatarProps> = ({
  width = "40px",
  height = "40px",
  imageSrc,
}) => (
  <div
    className={STYLE.__avatar_container}
    style={{
      minWidth: width,
      width,
      height,
    }}
  >
    {typeof imageSrc !== "undefined" && (
      <Image
        className={STYLE.__avatar_image}
        priority
        alt={imageSrc ? "avatar" : "anonymous_avatar"}
        src={imageSrc ?? anonymousImgSrc}
        fill
      />
    )}
  </div>
);

export default Avatar;
