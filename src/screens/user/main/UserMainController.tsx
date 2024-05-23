"use client";

import { FC } from "react";
import UserMainView, { UserMainViewProps } from "./UserMainView";

interface UserMainControllerProps {}

const UserMainController: FC<UserMainControllerProps> = () => {
  const viewProps: UserMainViewProps = {};

  return <UserMainView {...viewProps} />;
};

export default UserMainController;
