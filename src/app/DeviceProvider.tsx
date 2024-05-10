"use client";

import { FC, PropsWithChildren } from "react";
import { Device } from "@src/types/device";
import useReduxDispatch from "@src/hooks/redux/useReduxDispatch";
import { setReduxDevice } from "@src/libs/redux/modules/device";

interface DeviceProviderProps extends PropsWithChildren {
  device: Device;
}

const DeviceProvider: FC<DeviceProviderProps> = ({ device, children }) => {
  const dispatch = useReduxDispatch();

  dispatch(setReduxDevice({ device }));

  return children;
};

export default DeviceProvider;
