"use server";

import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import { RequestHandler, RequestResponse } from "@src/types/api";
import { TreasureItem } from "@src/types/treasure";
import variableAssignment from "@src/utils/variableAssignment";
import { cookies } from "next/headers";

interface GetTreasureParameter {
  id: string;
}

const getTreasure: RequestHandler<GetTreasureParameter, TreasureItem> = async ({
  id,
}) => {
  const cookieStore = cookies();

  const key = variableAssignment(API_GET_TREASURE_KEY, { id });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${key}`, {
    next: {
      revalidate: 5 * 60,
      tags: [key],
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const { data } = (await res.json()) as RequestResponse<TreasureItem>;

  return data;
};

export default getTreasure;
