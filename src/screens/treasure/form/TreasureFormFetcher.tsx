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
import { redirect } from "next/navigation";

interface TreasureFormFetcherProps {
  id: string;
}
const TreasureFormFetcher: FC<TreasureFormFetcherProps> = async ({ id }) => {
  const queryClient = new QueryClient();

  const [treasureData, userData] = await Promise.all([
    queryClient.fetchQuery({
      queryKey: [API_GET_TREASURE_KEY, { id }],
      queryFn: () => getTreasure({ id }),
    }),
    queryClient.fetchQuery({
      queryKey: [API_GET_USER_KEY],
      queryFn: () => getUser(),
    }),
  ]);

  const isValid = treasureData.user.userId === userData?.userId;

  if (!isValid) {
    throw new Error("403 Forbidden");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TreasureFormController id={id} />
    </HydrationBoundary>
  );
};

export default TreasureFormFetcher;
