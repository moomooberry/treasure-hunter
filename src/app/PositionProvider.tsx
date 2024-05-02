"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";
import useReduxDispatch from "@src/hooks/redux/useReduxDispatch";
import { setReduxPosition } from "@src/libs/redux/modules/position";

const PositionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useReduxDispatch();

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) => {
        const position = { lat: latitude, lng: longitude };
        setIsLoading(false);
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

  if (isLoading) return <div>loading...</div>;

  return children;
};

export default PositionProvider;
