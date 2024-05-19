"use server";

import { RequestHandler, RequestResponse } from "@src/types/api";
import { revalidateTag } from "next/cache";
import { API_GET_TREASURE_LIST_KEY } from "./getTreasureList";
import { cookies } from "next/headers";

export interface PostTreasureBody {
  lat: number;
  lng: number;
  imgSrc: string[];
  title: string;
  hint: string;
  reward: number | null;
}

const postTreasure: RequestHandler<PostTreasureBody, null> = async (body) => {
  const cookieStore = cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/treasure`, {
    method: "POST",
    headers: {
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(body),
  });

  const { data } = (await res.json()) as RequestResponse<null>;

  revalidateTag(API_GET_TREASURE_LIST_KEY);

  return data;
};

export default postTreasure;
