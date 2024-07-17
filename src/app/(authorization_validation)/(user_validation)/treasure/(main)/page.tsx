import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import TreasureMainList from "./_components/TreasureMainList";
import LayoutFooterMain from "@src/components/layout/footer/LayoutFooterMain";
import getTreasureList from "@src/api/treasure/getTreasureList";
import { API_GET_TREASURE_LIST_KEY } from "@src/libs/fetch/key/treasure";
import getUser from "@src/api/user/getUser";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";

import TreasureMainHeaderButton from "./_components/TreasureMainHeaderButton";

const TreasurePage = async () => {
  const distance = 3000;

  const position = { lat: 36, lng: 127 };

  const queryClient = new QueryClient();

  const [_, userData] = await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: [API_GET_TREASURE_LIST_KEY],
      queryFn: ({ pageParam }) =>
        getTreasureList({
          distance,
          position,
          pageNumber: pageParam,
          pageSize: 10,
        }),
      initialPageParam: 1,
    }),
    queryClient.fetchQuery({
      queryKey: [API_GET_USER_KEY],
      queryFn: () => getUser(),
    }),
  ]);

  if (!userData) {
    throw new Error("404 User Not Found");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutHeaderCommon
        title="보물 찾기"
        backDisabled
        option={<TreasureMainHeaderButton />}
      />

      <LayoutBodyCommon>
        <TreasureMainList distance={distance} position={position} />
      </LayoutBodyCommon>

      <LayoutFooterMain profileImg={userData.profile_image} />
    </HydrationBoundary>
  );
};

export default TreasurePage;
