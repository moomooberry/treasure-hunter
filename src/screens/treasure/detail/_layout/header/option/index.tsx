"use client";

import { FC, useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import getTreasure from "@src/api/treasure/getTreasure";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";
import TreasureDetailHeaderOptionShareButton from "./TreasureDetailHeaderOptionShareButton";
import TreasureDetailHeaderOptionDeleteButton from "./TreasureDetailHeaderOptionDeleteButton";
import TreasureDetailHeaderOptionEditButton from "./TreasureDetailHeaderOptionEditButton";

import STYLE from "./treasure.detail.header.option.module.scss";

const TreasureDetailHeaderOption: FC = () => {
  const { treasure_id } = useParams();

  const { data: treasureData } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { treasure_id }],
    queryFn: () => getTreasure({ treasure_id: treasure_id as string }),
    enabled: typeof treasure_id === "string",
  });

  const { data: userData } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  const isUserWrite = useMemo(() => {
    if (!treasureData || !userData) return false;
    return userData.id === treasureData.user.id;
  }, [treasureData, userData]);

  if (!treasureData) return null;

  return isUserWrite ? (
    <div className={STYLE.__header_option_container}>
      <TreasureDetailHeaderOptionDeleteButton />

      <TreasureDetailHeaderOptionEditButton />
    </div>
  ) : (
    <div className={STYLE.__header_option_container}>
      <TreasureDetailHeaderOptionShareButton />
    </div>
  );
};

export default TreasureDetailHeaderOption;
