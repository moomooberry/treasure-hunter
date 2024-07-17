import { FC } from "react";

import STYLE from "./treasure.main.fallback.module.scss";

interface TreasureMainFallbackProps {
  length: number;
}

const TreasureMainFallback: FC<TreasureMainFallbackProps> = ({ length }) => (
  <ul className={STYLE.__treasure_main_ul}>
    {Array.from({ length }).map((_, index) => (
      <li key={index}>
        <div className={STYLE.__treasure_list_wrapper}>
          <div className={STYLE.__treasure_list_fallback_image_wrapper} />

          <div className={STYLE.__treasure_list_info_box}>
            <div className={STYLE.__treasure_list_fallback_title} />
            <div className={STYLE.__treasure_list_fallback_user} />
            <div className={STYLE.__treasure_list_fallback_reward} />
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default TreasureMainFallback;
