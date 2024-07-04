"use client";

import { FC, useCallback, useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import { TreasureMap } from "@src/libs/google-map";
import { Position } from "@src/types/position";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";
import { TreasureFormFields } from "@src/screens/treasure/form/TreasureFormView";

import STYLE from "@src/screens/treasure/form/treasure.form.module.scss";

interface TreasureFormStepPositionProps {
  formMethods: UseFormReturn<TreasureFormFields>;
}

const TreasureFormStepPosition: FC<TreasureFormStepPositionProps> = ({
  formMethods: { setValue, setError },
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const position = useReduxSelector((state) => state.reduxPosition.position);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, onError, onPosition]);

  useEffect(() => {
    init();
  }, [init]);

  return <div ref={ref} className={STYLE.__form_map} />;
};

export default TreasureFormStepPosition;
