"use client";

import { FC, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

import EditIcon from "@src/components/icons/EditIcon";

import STYLE from "./treasure.detail.layout.header.module.scss";

const TreasureDetailLayoutHeaderEditButton: FC = () => {
  const { push } = useRouter();

  const { treasure_id } = useParams();

  const onEditClick = useCallback(() => {
    push(`/treasure/${treasure_id}/edit`);
  }, [treasure_id, push]);

  return (
    <button className={STYLE.__header_option_button} onClick={onEditClick}>
      <EditIcon width="16px" height="16px" />
    </button>
  );
};

export default TreasureDetailLayoutHeaderEditButton;
