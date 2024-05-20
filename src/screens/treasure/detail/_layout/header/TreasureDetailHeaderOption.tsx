"use client";

import { FC, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import deleteTreasure from "@src/api/treasure/deleteTreasure";
import TrashcanIcon from "@src/components/icons/TrashcanIcon";
import EditIcon from "@src/components/icons/EditIcon";
import getTreasure from "@src/api/treasure/getTreasure";

import STYLE from "./treasure.detail.header.module.scss";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import getUser from "@src/api/user/getUser";
import ShareIcon from "@src/components/icons/ShareIcon";

const TreasureDetailHeaderOption: FC = () => {
  const { push, back } = useRouter();

  const { id } = useParams();

  const { data: treasureData } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { id }],
    queryFn: () => getTreasure({ id: id as string }),
  });

  const { data: userData } = useQuery({
    queryKey: [API_GET_USER_KEY],
    queryFn: () => getUser(),
  });

  const isUserWrite = useMemo(() => {
    if (!treasureData || !userData) return false;
    return userData.userId === treasureData.user.userId;
  }, [treasureData, userData]);

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteTreasure,
    onSuccess: () => {
      back();
    },
  });

  const onDeleteClick = useCallback(() => {
    // TODO -> 팝업
    deleteMutate({ id: id as string });
  }, [deleteMutate, id]);

  const onEditClick = useCallback(() => {
    push(`/treasure/${id}/edit`);
  }, [id, push]);

  const onShareClick = useCallback(() => {
    // TODO -> 공유하기 브릿지
  }, []);

  if (!treasureData) return null;

  return isUserWrite ? (
    <div className={STYLE.__treasure_detail_header_option_container}>
      <button
        className={STYLE.__treasure_detail_header_option_button}
        onClick={onDeleteClick}
      >
        <TrashcanIcon width="16px" height="16px" />
      </button>

      <button
        className={STYLE.__treasure_detail_header_option_button}
        onClick={onEditClick}
      >
        <EditIcon width="16px" height="16px" />
      </button>
    </div>
  ) : (
    <div className={STYLE.__treasure_detail_header_option_container}>
      <button
        className={STYLE.__treasure_detail_header_option_button}
        onClick={onShareClick}
      >
        <ShareIcon width="18px" height="18px" />
      </button>
    </div>
  );
};

export default TreasureDetailHeaderOption;
