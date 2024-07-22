import { FC } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";

import TreasureAddForm from "./_components/TreasureAddForm";

const TreasureAddPage: FC = async () => {
  const queryClient = new QueryClient();

  const userData = await queryClient.fetchQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  if (!userData) {
    throw new Error("404 User Not Found");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TreasureAddForm />
    </HydrationBoundary>
  );
};

export default TreasureAddPage;
