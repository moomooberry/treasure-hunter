"use client";

import { FC } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import getTreasure from "@src/api/treasure/getTreasure";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";

import TreasureDetailView, {
  TreasureDetailViewProps,
} from "./TreasureDetailView";

const TreasureDetailController: FC = () => {
  const { treasure_id } = useParams();

  const { data } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
    queryFn: () => getTreasure({ treasure_id: treasure_id as string }),
  });

  const viewProps: TreasureDetailViewProps = {
    data,
  };

  return <TreasureDetailView {...viewProps} />;
};

export default TreasureDetailController;
