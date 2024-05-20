"use client";

import { FC, useCallback, useMemo, useState } from "react";
import getTreasure from "@src/api/treasure/getTreasure";
import { useQuery } from "@tanstack/react-query";
import TreasureDetailView, {
  TreasureDetailViewProps,
} from "./TreasureDetailView";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";

const TreasureDetailController: FC = () => {
  const [isLimit, setIsLimit] = useState(false);

  const { id } = useParams();

  const currentTime = useMemo(() => dayjs().valueOf(), []);

  const { data } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { id }],
    queryFn: () => getTreasure({ id: id as string }),
  });

  const onLimit = useCallback(() => {
    setIsLimit(true);
  }, []);

  const viewProps: TreasureDetailViewProps = {
    isLimit,
    currentTime,
    onLimit,
    data,
  };

  return <TreasureDetailView {...viewProps} />;
};

export default TreasureDetailController;
