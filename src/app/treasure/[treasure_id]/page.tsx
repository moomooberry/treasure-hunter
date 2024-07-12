import { FC } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import getUser from "@src/api/user/getUser";
import getTreasure from "@src/api/treasure/getTreasure";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import MoneyBagIcon from "@src/components/icons/MoneyBagIcon";
import TimerIcon from "@src/components/icons/TimerIcon";
import Avatar from "@src/components/avatar/Avatar";
import LocationIcon from "@src/components/icons/LocationIcon";

import TreasureDetailLayoutBody from "./_components/TreasureDetailLayoutBody";
import TreasureDetailTimerLimit from "./_components/TreasureDetailTimerLimit";
import TreasureDetailLayoutHeader from "./_components/TreasureDetailLayoutHeader";
import TreasureDetailComment from "./_components/TreasureDetailComment";
import TreasureDetailDistanceText from "./_components/TreasureDetailDistanceText";
import TreasureDetailPhotoSwiper from "./_components/TreasureDetailPhotoSwiper";
import TreasureDetailMap from "./_components/TreasureDetailMap";

import STYLE from "./_components/treasure.detail.module.scss";

interface TreasureDetailPageProps {
  params: { treasure_id: string };
}

const TreasureDetailPage: FC<TreasureDetailPageProps> = async ({
  params: { treasure_id },
}) => {
  const queryClient = new QueryClient();

  const [treasureData] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
      queryFn: () => getTreasure({ treasure_id }),
    }),
    queryClient.prefetchQuery({
      queryKey: [API_GET_USER_KEY],
      queryFn: () => getUser(),
    }),
  ]);

  if (!treasureData) {
    throw new Error("404 Not Found");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TreasureDetailLayoutHeader />

      <TreasureDetailLayoutBody>
        <div>
          <TreasureDetailPhotoSwiper images={treasureData.images} />

          <div className={STYLE.__treasure_detail_container}>
            <section className={STYLE.__treasure_detail_first_section}>
              <h1 className={STYLE.__treasure_detail_title}>
                {treasureData.title}
              </h1>

              {treasureData.reward && (
                <div className={STYLE.__treasure_detail_reward}>
                  <MoneyBagIcon width="20px" height="20px" />
                  {treasureData.reward.toLocaleString()}원
                </div>
              )}

              <div className={STYLE.__treasure_detail_timer_wrapper}>
                <TimerIcon color="#2d3436" width="18px" height="18px" />
                <TreasureDetailTimerLimit />
              </div>

              <div className={STYLE.__treasure_detail_distance_wrapper}>
                <LocationIcon color="#636e72" width="16px" height="16px" />
                <TreasureDetailDistanceText />
              </div>
            </section>

            <section className={STYLE.__treasure_detail_common_section}>
              <div className={STYLE.__treasure_detail_user_wrapper}>
                <div className={STYLE.__treasure_detail_user_avatar}>
                  <Avatar imageSrc={treasureData.user.profile_image} />
                </div>
                <div className={STYLE.__treasure_detail_user}>
                  {treasureData.user.username}님의 보물
                </div>
              </div>
            </section>

            <section className={STYLE.__treasure_detail_common_section}>
              <h3 className={STYLE.__treasure_detail_common_label}>힌트</h3>
              <div>{treasureData.hint}</div>
            </section>

            <section className={STYLE.__treasure_detail_common_section}>
              <h3 className={STYLE.__treasure_detail_common_label}>위치</h3>
              <TreasureDetailMap />
            </section>

            <section className={STYLE.__treasure_detail_last_section}>
              <TreasureDetailComment />
            </section>
          </div>
        </div>
      </TreasureDetailLayoutBody>
    </HydrationBoundary>
  );
};

export default TreasureDetailPage;
