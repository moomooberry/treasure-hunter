"use client";

import { FC, PropsWithChildren } from "react";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import LayoutBody from "@src/components/layout/body";
import { useQuery } from "@tanstack/react-query";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";

const TreasureDetailBody: FC<PropsWithChildren> = ({ children }) => {
  const bottom = useReduxSelector((state) => state.reduxDevice.device.bottom);

  const { data } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  return (
    <LayoutBody
      marginTop="0"
      marginBottom={`calc(${data ? "60px" : "20px"} + ${bottom})`}
    >
      {children}
    </LayoutBody>
  );
};

export default TreasureDetailBody;
