import { FC } from "react";
import Layout from "@src/components/layout";

import STYLE from "./treasure.main.module.scss";

interface TreasureMainFallbackProps {
  length: number;
}

const TreasureMainFallback: FC<TreasureMainFallbackProps> = ({ length }) => (
  <Layout>
    <Layout.Header title="보물 찾기" backDisabled />
    <Layout.Body>
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
    </Layout.Body>
    <Layout.Footer />
  </Layout>
);

export default TreasureMainFallback;
