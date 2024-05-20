import getTreasureList from "@src/api/treasure/getTreasureList";
import { API_GET_TREASURE_LIST_KEY } from "@src/libs/fetch/key/treasure";
import TreasureMainController from "@src/screens/treasure/main/TreasureMainController";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const TreasureMainFetcher = async () => {
  const distance = 3000;

  const position = { lat: 36, lng: 127 };

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [API_GET_TREASURE_LIST_KEY],
    queryFn: ({ pageParam }) =>
      getTreasureList({
        distance,
        position,
        pageNumber: pageParam,
        pageSize: 10,
      }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TreasureMainController distance={distance} position={position} />
    </HydrationBoundary>
  );
};

export default TreasureMainFetcher;
