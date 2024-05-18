import { FC } from "react";
import getTreasure, {
  API_GET_TREASURE_KEY,
} from "@src/api/treasure/getTreasure";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import TreasureDetailController from "./TreasureDetailController";

interface TreasureDetailFetcherProps {
  id: string;
}

const TreasureDetailFetcher: FC<TreasureDetailFetcherProps> = async ({
  id,
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [API_GET_TREASURE_KEY, { id }],
    queryFn: () => getTreasure({ id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TreasureDetailController id={id} />
    </HydrationBoundary>
  );
};

export default TreasureDetailFetcher;
