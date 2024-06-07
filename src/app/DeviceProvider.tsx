"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Device } from "@src/types/device";
import useReduxDispatch from "@src/hooks/redux/useReduxDispatch";
import { setReduxDevice } from "@src/libs/redux/modules/device";

interface DeviceProviderProps extends PropsWithChildren {
  device: Device;
}

const DeviceProvider: FC<DeviceProviderProps> = ({ device, children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(setReduxDevice({ device }));
    setIsLoading(false);
  }, [device, dispatch]);

  if (isLoading) return null;

  return children;
};

export default DeviceProvider;
