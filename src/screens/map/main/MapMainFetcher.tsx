import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import getTreasureList from "@src/api/treasure/getTreasureList";
import { API_GET_TREASURE_LIST_KEY } from "@src/libs/fetch/key/treasure";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";

import MapMainController from "./MapMainController";

const MapMainFetcher = async () => {
  const distance = 3000;

  const position = { lat: 36, lng: 127 };

  const queryClient = new QueryClient();

  await Promise.all([
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
    queryClient.prefetchQuery({
      queryKey: [API_GET_USER_KEY],
      queryFn: () => getUser(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MapMainController distance={distance} position={position} />
    </HydrationBoundary>
  );
};

export default MapMainFetcher;
