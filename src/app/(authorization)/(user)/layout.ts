import getUser from "@src/api/user/getUser";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();

  if (!user) {
    redirect("/user/add");
  }

  return children;
};

export default UserLayout;
