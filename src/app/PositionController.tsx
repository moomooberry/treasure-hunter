"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import useReduxDispatch from "@src/hooks/redux/useReduxDispatch";
import { setReduxPosition } from "@src/libs/redux/modules/position";

const PositionController: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useReduxDispatch();

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        const position = { lat: latitude, lng: longitude };
        dispatch(setReduxPosition({ position }));
      },
      (e) => {
        // TODO bridge로 권한 받기
        console.error("error form PositionController", e);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, [dispatch]);

  return children;
};

export default PositionController;
