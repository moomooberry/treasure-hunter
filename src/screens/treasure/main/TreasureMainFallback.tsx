"use client";

import { FC } from "react";

import LayoutBody from "@src/components/layout/body";
import LayoutHeader from "@src/components/layout/header";
import LayoutFooter from "@src/components/layout/footer";

import STYLE from "./treasure.main.module.scss";

interface TreasureMainFallbackProps {
  length: number;
}

const TreasureMainFallback: FC<TreasureMainFallbackProps> = ({ length }) => (
  <>
    <LayoutHeader.Common title="보물 찾기" backDisabled />
    <LayoutBody.Common>
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
    </LayoutBody.Common>
    <LayoutFooter.Common />
  </>
);

export default TreasureMainFallback;
