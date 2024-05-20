"use server";

import { API_GET_TREASURE_LIST_KEY } from "@src/libs/fetch/key/treasure";
import { RequestHandler, RequestResponse } from "@src/types/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface DeleteTreasureParameter {
  id: string;
}

const deleteTreasure: RequestHandler<DeleteTreasureParameter, null> = async ({
  id,
}) => {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/treasure/${id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  const { data } = (await res.json()) as RequestResponse<null>;

  revalidateTag(API_GET_TREASURE_LIST_KEY);

  return data;
};

export default deleteTreasure;
