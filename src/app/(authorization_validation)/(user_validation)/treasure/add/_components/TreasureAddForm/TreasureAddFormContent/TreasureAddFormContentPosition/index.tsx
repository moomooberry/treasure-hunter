"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import { TreasureMap } from "@src/libs/google-map";
import { Position } from "@src/types/position";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";
import useZustandPositionStore from "@src/hooks/zustand/useZustandPositionStore";

import type { TreasureAddFormFields } from "../../../TreasureAddForm";

import STYLE from "./treasure.add.form.content.position.module.scss";

const TreasureAddFormContentPosition: FC = () => {
  const { setValue, setError } = useFormContext<TreasureAddFormFields>();

  const [treasureMap, setTreasureMap] = useState<TreasureMap>();

  const ref = useRef<HTMLDivElement>(null);

  const { position } = useZustandPositionStore();

  const { data } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  const onPosition = useCallback(
    (value: Position) => {
      setValue("position", value);
    },
    [setValue]
  );

  const onError = useCallback(() => {
    setError("position", {
      types: {
        isOverBuffer: "현재 위치랑 먼 곳에 숨기려 하는데 괜찮으시겠어요?",
      },
    });
  }, [setError]);

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

    setTreasureMap(map);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, onError, onPosition]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!treasureMap) return;

    treasureMap.moveUser({ position });
    treasureMap.moveUserBuffer({ position });
  }, [position, treasureMap]);

  return (
    <motion.div
      ref={ref}
      className={STYLE.__form_map}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  );
};

export default TreasureAddFormContentPosition;
