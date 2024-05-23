import { FC } from "react";
import getTreasure from "@src/api/treasure/getTreasure";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import TreasureFormController from "./TreasureFormController";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";

interface TreasureFormFetcherProps {
  treasureId: string;
}
const TreasureFormFetcher: FC<TreasureFormFetcherProps> = async ({
  treasureId,
}) => {
  const queryClient = new QueryClient();

  const [treasureData, userData] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: [API_GET_TREASURE_KEY, { treasureId }],
      queryFn: () => getTreasure({ treasureId }),
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
      <TreasureFormController treasureId={treasureId} />
    </HydrationBoundary>
  );
};

export default TreasureFormFetcher;
