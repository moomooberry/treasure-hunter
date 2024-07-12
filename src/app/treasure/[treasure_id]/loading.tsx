import { FC } from "react";

import STYLE from "./_components/treasure.detail.module.scss";

const TreasureDetailLoading: FC = () => (
  <>
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
  </>
);

export default TreasureDetailLoading;
