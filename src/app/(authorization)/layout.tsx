import { ReactNode } from "react";
import { createSupabaseFromServer } from "@src/libs/supabase/server";
import { redirect } from "next/navigation";

const AuthorizationLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = createSupabaseFromServer();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/auth/login");
  }

  return children;
};

export default AuthorizationLayout;
