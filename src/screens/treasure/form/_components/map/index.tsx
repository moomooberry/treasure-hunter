"use client";

import { FC, useCallback, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { TreasureMap } from "@src/libs/google-map";
import { Position } from "@src/types/position";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";

import STYLE from "./treasure.form.map.module.scss";

interface TreasureFormMapProps {
  onPosition: (value: Position) => void;
  onError: (value: TreasureMap["_error"]) => void;
}

const TreasureFormMap: FC<TreasureFormMapProps> = ({ onError, onPosition }) => {
  const ref = useRef<HTMLDivElement>(null);

  const position = useReduxSelector((state) => state.reduxPosition.position);

  const { data } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  const init = useCallback(async () => {
    if (!ref.current || !data) return;

    const map = new TreasureMap(ref.current);

    await map.init({
      position,
      zoom: 20,
      minZoom: 19,
    });

    map.loadUser({ position, image: data.profile_image });

    map.loadBuffer({ position, bufferRadius: 30 });

    map.generateTreasure({ position, onPosition, onError });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, onError, onPosition]);

  useEffect(() => {
    init();
  }, [init]);

  return <div ref={ref} className={STYLE.__form_map} />;
};

export default TreasureFormMap;
