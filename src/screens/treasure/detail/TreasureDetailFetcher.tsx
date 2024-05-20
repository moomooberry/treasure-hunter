import { FC } from "react";
import getTreasure from "@src/api/treasure/getTreasure";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import TreasureDetailController from "./TreasureDetailController";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";

interface TreasureDetailFetcherProps {
  id: string;
}

const TreasureDetailFetcher: FC<TreasureDetailFetcherProps> = async ({
  id,
}) => {
  const queryClient = new QueryClient();

  const [treasureData] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: [API_GET_TREASURE_KEY, { id }],
      queryFn: () => getTreasure({ id }),
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
