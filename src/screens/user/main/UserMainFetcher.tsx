import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import getUser from "@src/api/user/getUser";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";

import UserMainController from "./UserMainController";

const UserMainFetcher = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserMainController />
    </HydrationBoundary>
  );
};

export default UserMainFetcher;
