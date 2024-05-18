"use client";

import { FC, useCallback, useMemo, useState } from "react";
import getTreasure, {
  API_GET_TREASURE_KEY,
} from "@src/api/treasure/getTreasure";
import { useQuery } from "@tanstack/react-query";
import TreasureDetailView, {
  TreasureDetailViewProps,
} from "./TreasureDetailView";
import dayjs from "dayjs";

interface TreasureDetailControllerProps {
  id: string;
}

const TreasureDetailController: FC<TreasureDetailControllerProps> = ({
  id,
}) => {
  const [isLimit, setIsLimit] = useState(false);

  const currentTime = useMemo(() => dayjs().valueOf(), []);

  const { data } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { id }],
    queryFn: () => getTreasure({ id }),
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
