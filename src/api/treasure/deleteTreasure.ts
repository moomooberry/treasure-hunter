"use server";

import { RequestHandler, RequestResponse } from "@src/types/api";
import { revalidateTag } from "next/cache";
import { API_GET_TREASURE_LIST_KEY } from "./getTreasureList";

interface DeleteTreasureParameter {
  id: string;
}

const deleteTreasure: RequestHandler<DeleteTreasureParameter, null> = async ({
  id,
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/treasure/${id}`,
    {
      method: "DELETE",
    }
  );

  const { data } = (await res.json()) as RequestResponse<null>;

  revalidateTag(API_GET_TREASURE_LIST_KEY);

  return data;
};

export default deleteTreasure;
