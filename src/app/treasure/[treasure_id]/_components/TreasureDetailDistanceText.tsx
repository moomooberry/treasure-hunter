"use client";

import { FC, useMemo } from "react";
import { useParams } from "next/navigation";
import { useAnimate } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import getTreasure from "@src/api/treasure/getTreasure";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import calculateDistance from "@src/utils/calculateDistance";
import useInitialPosition from "@src/hooks/position/useInitialPosition";

const TreasureDetailDistanceText: FC = () => {
  const { treasure_id } = useParams();

  const { data } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
    queryFn: () => getTreasure({ treasure_id: treasure_id as string }),
  });

  const { position } = useInitialPosition();

  const [scope, animate] = useAnimate();

  const distanceText = useMemo(() => {
    if (!data) {
      throw new Error("no Data");
    }

    if (!position) return "보물 위치 계산중";

    animate(scope.current, { opacity: [0, 1] });

    const distance = calculateDistance({
      referencePosition: position,
      comparisonPosition: { lat: data.lat, lng: data.lng },
    });

    if (distance < 10) return "보물이 근처에 있어요";

    if (distance >= 10 && distance < 1000)
      return `보물까지 ${Math.ceil(distance).toLocaleString()}m`;

    if (distance >= 1000 && distance < 10000)
      return `보물까지 ${(Math.ceil(distance / 10) / 100).toLocaleString()}km`;

    if (distance >= 10000) return "보물이 먼 거리에 있어요";
  }, [animate, data, position, scope]);

  return <span ref={scope}>{distanceText}</span>;
};

export default TreasureDetailDistanceText;
