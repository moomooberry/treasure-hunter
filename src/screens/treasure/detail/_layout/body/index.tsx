"use client";

import { FC, PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";

import LayoutBody from "@src/components/layout/body";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";
import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";

const TreasureDetailBody: FC<PropsWithChildren> = ({ children }) => {
  const {
    device: { bottom },
  } = useZustandDeviceStore();

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
