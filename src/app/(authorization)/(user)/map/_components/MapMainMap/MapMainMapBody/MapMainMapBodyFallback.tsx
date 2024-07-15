import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import treasureImgSrc from "@src/assets/webp/treasure_512_512.webp";

import STYLE from "./map.main.map.body.module.scss";

const MapMainMapBodyFallback: FC = () => (
  <div className={STYLE.__map_loading}>
    <motion.div
      className={STYLE.__map_loading_contnet}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
    >
      <Image src={treasureImgSrc} alt="treasure_image" width={50} height={50} />
      보물 지도 생성 중
    </motion.div>
  </div>
);

export default MapMainMapBodyFallback;
