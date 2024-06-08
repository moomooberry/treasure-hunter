import { FC } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import getTreasure from "@src/api/treasure/getTreasure";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";

import TreasureDetailController from "./TreasureDetailController";

interface TreasureDetailFetcherProps {
  treasure_id: string;
}

const TreasureDetailFetcher: FC<TreasureDetailFetcherProps> = async ({
  treasure_id,
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
      <TreasureDetailController />
    </HydrationBoundary>
  );
};

export default TreasureDetailFetcher;
