"use server";

import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";
import { RequestHandler, RequestResponse } from "@src/types/api";
import { GetTreasureDetailResponse } from "@src/types/api/treasure";
import variableAssignment from "@src/utils/variableAssignment";
import { cookies } from "next/headers";

interface GetTreasureParameter {
  id: string;
}

const getTreasure: RequestHandler<
  GetTreasureDetailResponse,
  GetTreasureParameter
> = async ({ id }) => {
  const cookieStore = cookies();

  const key = variableAssignment(API_GET_TREASURE_KEY, { id });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${key}`, {
    method: "GET",
    next: {
      revalidate: 5 * 60,
      tags: [key],
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const { data } =
    (await res.json()) as RequestResponse<GetTreasureDetailResponse>;

  return data;
};

export default getTreasure;
