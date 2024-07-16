import { ReactNode } from "react";
import { redirect } from "next/navigation";

import getUser from "@src/api/user/getUser";

const UserValidationLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();

  if (!user) {
    redirect("/user/add");
  }

  return children;
};

export default UserValidationLayout;
