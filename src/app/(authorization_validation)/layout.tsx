import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { createSupabaseFromServer } from "@src/libs/supabase/server";

const AuthorizationValidationLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const supabase = createSupabaseFromServer();

  const auth = await supabase.auth.getUser();

  if (auth.error || !auth.data.user) {
    redirect("/auth/login");
  }

  return children;
};

export default AuthorizationValidationLayout;
