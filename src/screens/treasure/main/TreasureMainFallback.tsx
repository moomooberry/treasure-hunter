"use client";

import { FC } from "react";

import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import LayoutFooterCommon from "@src/components/layout/footer/LayoutFooterCommon";

import STYLE from "./treasure.main.module.scss";

interface TreasureMainFallbackProps {
  length: number;
}

const TreasureMainFallback: FC<TreasureMainFallbackProps> = ({ length }) => (
  <>
    <LayoutHeaderCommon title="보물 찾기" backDisabled />
    <LayoutBodyCommon>
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
    </LayoutBodyCommon>
    <LayoutFooterCommon />
  </>
);

export default TreasureMainFallback;
