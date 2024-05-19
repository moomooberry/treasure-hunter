"use server";

import { RequestHandler, RequestResponse } from "@src/types/api";
import { revalidateTag } from "next/cache";
import { API_GET_TREASURE_LIST_KEY } from "./getTreasureList";
import { API_GET_TREASURE_KEY } from "./getTreasure";
import variableAssignment from "@src/utils/variableAssignment";
import { cookies } from "next/headers";

export interface PutTreasureBody {
  imgSrc: string[];
  title: string;
  hint: string;
}

interface PutTreasureParameter extends PutTreasureBody {
  id: string;
}

const putTreasure: RequestHandler<PutTreasureParameter, null> = async ({
  id,
  ...body
}) => {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/treasure/${id}`,
    {
      method: "PUT",
      headers: {
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(body),
    }
  );

  const { data } = (await res.json()) as RequestResponse<null>;

  revalidateTag(API_GET_TREASURE_LIST_KEY);
  revalidateTag(variableAssignment(API_GET_TREASURE_KEY, { id }));

  return data;
};

export default putTreasure;
