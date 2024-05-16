import { FC } from "react";

import STYLE from "./treasure.list.module.scss";

interface TreasureListFallbackProps {
  length: number;
}

const TreasureListFallback: FC<TreasureListFallbackProps> = ({ length }) => (
  <ul className={STYLE.__treasure_list_ul}>
    {Array.from({ length }).map((_, index) => (
      <li key={index} className={STYLE.__treasure_list_li}>
        <div className={STYLE.__treasure_list_fallback_image_wrapper} />
        <div className={STYLE.__treasure_list_info_box}>
          <div className={STYLE.__treasure_list_fallback_title} />
          <div className={STYLE.__treasure_list_fallback_user} />
          <div className={STYLE.__treasure_list_fallback_reward} />
        </div>
      </li>
    ))}
  </ul>
);

export default TreasureListFallback;
