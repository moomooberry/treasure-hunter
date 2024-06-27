import { Suspense } from "react";

import UserMainFallback from "@src/screens/user/main/UserMainFallback";
import UserMainFetcher from "@src/screens/user/main/UserMainFetcher";

const UserPage = () => (
  <Suspense fallback={<UserMainFallback />}>
    <UserMainFetcher />
  </Suspense>
);

export default UserPage;
