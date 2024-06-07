import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import getUser from "@src/api/user/getUser";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";

import UserFormController from "./UserFormController";

const UserFormFetcher = async ({ isEdit }: { isEdit: boolean }) => {
  const queryClient = new QueryClient();

  const user = await queryClient.fetchQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  if (!isEdit && user) {
    throw new Error("Already Exist User");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserFormController isEdit={isEdit} />
    </HydrationBoundary>
  );
};

export default UserFormFetcher;
