import { FC } from "react";
import Layout from "@src/components/layout";

import STYLE from "./treasure.detail.module.scss";

const TreasureDetailFallback: FC = () => (
  <Layout>
    <div className={STYLE.__treasure_detail_fallback_image} />
    <div className={STYLE.__treasure_detail_container}>
      <section className={STYLE.__treasure_detail_first_section}>
        <div className={STYLE.__treasure_detail_fallback_title} />
        <div className={STYLE.__treasure_detail_fallback_reward} />
        <div className={STYLE.__treasure_detail_fallback_timer_wrapper} />
        <div className={STYLE.__treasure_detail_fallback_distance} />
      </section>

      <section className={STYLE.__treasure_detail_common_section}>
        <div className={STYLE.__treasure_detail_user_wrapper}>
          <div className={STYLE.__treasure_detail_fallback_avatar} />
          <div className={STYLE.__treasure_detail_fallback_user} />
        </div>
      </section>

      <section className={STYLE.__treasure_detail_last_section}>
        <div className={STYLE.__treasure_detail_fallback_label} />
        <div className={STYLE.__treasure_detail_fallback_hint} />
      </section>
    </div>
  </Layout>
);

export default TreasureDetailFallback;
