import { FC } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";
import LayoutHeaderCommon from "@src/components/layout/header/LayoutHeaderCommon";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import LayoutFooterMain from "@src/components/layout/footer/LayoutFooterMain";

import UserMainProfileCard from "./_components/UserMainProfileCard";
import UserMainList from "./_components/UserMainList";

const UserMainPage: FC = async () => {
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
      <LayoutHeaderCommon title="내 정보" backDisabled />

      <LayoutBodyCommon>
        <UserMainProfileCard />

        <UserMainList />
      </LayoutBodyCommon>

      <LayoutFooterMain profileImg={userData.profile_image} />
    </HydrationBoundary>
  );
};

export default UserMainPage;
