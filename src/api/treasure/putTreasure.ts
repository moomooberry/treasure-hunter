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
  images: string[];
  title: string;
  hint: string;
}

interface PutTreasureParameter extends PutTreasureBody {
  treasure_id: string;
}

const putTreasure: RequestHandler<null, PutTreasureParameter> = async ({
  treasure_id,
  ...body
}) => {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/treasure/${treasure_id}`,
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
  revalidateTag(variableAssignment(API_GET_TREASURE_KEY, { treasure_id }));

  return data;
};

export default putTreasure;
