"use client";

import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import treasureImgSrc from "@src/assets/webp/treasure_512_512.webp";

import STYLE from "./status.loading.treasure.fallback.module.scss";

interface StatusLoadingTreasureFallbackProps {
  text: string;
}

const StatusLoadingTreasureFallback: FC<StatusLoadingTreasureFallbackProps> = ({
  text,
}) => (
  <div className={STYLE.__map_loading}>
    <motion.div
      className={STYLE.__map_loading_content}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
    >
      <Image src={treasureImgSrc} alt="treasure_image" width={50} height={50} />
      {text}
    </motion.div>
  </div>
);

export default StatusLoadingTreasureFallback;
