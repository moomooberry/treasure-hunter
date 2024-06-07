"use client";

import { FC, PropsWithChildren } from "react";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import LayoutBody from "@src/components/layout/body";

const TreasureDetailBody: FC<PropsWithChildren> = ({ children }) => {
  const bottom = useReduxSelector((state) => state.reduxDevice.device.bottom);

  return (
    <LayoutBody marginTop="0" marginBottom={`calc(60px + ${bottom})`}>
      {children}
    </LayoutBody>
  );
};

export default TreasureDetailBody;
