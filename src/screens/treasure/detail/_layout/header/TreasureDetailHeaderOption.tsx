"use client";

import { FC, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import deleteTreasure from "@src/api/treasure/deleteTreasure";
import TrashcanIcon from "@src/components/icons/TrashcanIcon";
import EditIcon from "@src/components/icons/EditIcon";
import getTreasure from "@src/api/treasure/getTreasure";

import STYLE from "./treasure.detail.header.module.scss";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";

const TreasureDetailHeaderOption: FC = () => {
  const { push, back } = useRouter();

  const { id } = useParams();

  // TODO true를 validation 해야함 -> 작성자인지
  const isValid = typeof id === "string" && true;

  const { data } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { id }],
    queryFn: () => getTreasure({ id: id as string }),
  });

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

  if (!data) return undefined;

  if (isValid)
    return (
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
    );
};

export default TreasureDetailHeaderOption;
