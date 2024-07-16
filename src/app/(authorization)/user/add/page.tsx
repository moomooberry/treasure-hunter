import { QueryClient } from "@tanstack/react-query";

import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import getUser from "@src/api/user/getUser";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";

import UserAddForm from "./_components/UserAddForm";

const UserAddPage = async () => {
  const queryClient = new QueryClient();

  const userData = await queryClient.fetchQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  if (userData) {
    throw new Error("Already Exist User");
  }

  return (
    <>
      <LayoutHeaderCommon title="프로필 만들기" backDisabled />
      <UserAddForm />
    </>
  );
};

export default UserAddPage;
