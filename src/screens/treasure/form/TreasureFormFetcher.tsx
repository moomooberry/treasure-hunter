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

import TreasureFormController from "./TreasureFormController";

interface TreasureFormFetcherProps {
  treasure_id: string;
}
const TreasureFormFetcher: FC<TreasureFormFetcherProps> = async ({
  treasure_id,
}) => {
  const queryClient = new QueryClient();

  const [treasureData, userData] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
      queryFn: () => getTreasure({ treasure_id }),
    }),
    queryClient.fetchQuery({
      queryKey: [API_GET_USER_KEY],
      queryFn: () => getUser(),
    }),
  ]);

  const isValid = treasureData.user.id === userData?.id;

  if (!isValid) {
    throw new Error("403 Forbidden");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TreasureFormController />
    </HydrationBoundary>
  );
};

export default TreasureFormFetcher;
