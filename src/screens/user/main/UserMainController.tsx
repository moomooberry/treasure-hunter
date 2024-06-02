"use client";

import { FC } from "react";
import UserMainView, { UserMainViewProps } from "./UserMainView";
import { useQuery } from "@tanstack/react-query";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";

interface UserMainControllerProps {}

const UserMainController: FC<UserMainControllerProps> = () => {
  const { data } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  console.log("data", data);

  const viewProps: UserMainViewProps = {};

  return <UserMainView {...viewProps} />;
};

export default UserMainController;
