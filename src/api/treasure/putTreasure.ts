"use server";

import { RequestHandler, RequestResponse } from "@src/types/api";
import { revalidateTag } from "next/cache";
import variableAssignment from "@src/utils/variableAssignment";
import { cookies } from "next/headers";
import {
  API_GET_TREASURE_KEY,
  API_GET_TREASURE_LIST_KEY,
} from "@src/libs/fetch/key/treasure";

export interface PutTreasureBody {
  imgSrc: string[];
  title: string;
  hint: string;
}

interface PutTreasureParameter extends PutTreasureBody {
  treasureId: string;
}

const putTreasure: RequestHandler<null, PutTreasureParameter> = async ({
  treasureId,
  ...body
}) => {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/treasure/${treasureId}`,
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
  revalidateTag(variableAssignment(API_GET_TREASURE_KEY, { treasureId }));

  return data;
};

export default putTreasure;
