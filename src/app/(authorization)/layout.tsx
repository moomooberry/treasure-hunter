import { ReactNode } from "react";
import { createSupabaseFromServer } from "@src/libs/supabase/server";
import { redirect } from "next/navigation";
import getUser from "@src/api/user/getUser";

const AuthorizationLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = createSupabaseFromServer();

  const auth = await supabase.auth.getUser();

  if (auth.error || !auth.data.user) {
    redirect("/auth/login");
  }

  return children;
};

export default AuthorizationLayout;
