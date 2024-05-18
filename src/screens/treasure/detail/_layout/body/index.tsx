"use client";

import { FC, PropsWithChildren } from "react";
import LayoutBody from "@src/components/layout/LayoutBody";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";

const TreasureDetailBody: FC<PropsWithChildren> = ({ children }) => {
  const bottom = useReduxSelector((state) => state.reduxDevice.device.bottom);

  return (
    <LayoutBody marginTop="0" marginBottom={`calc(60px + ${bottom})`}>
      {children}
    </LayoutBody>
  );
};

export default TreasureDetailBody;
