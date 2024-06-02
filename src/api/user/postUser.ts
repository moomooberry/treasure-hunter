"use server";

import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import { RequestHandler, RequestResponse } from "@src/types/api";
import { User } from "@src/types/user";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export type PostUserBody = Omit<User, "id" | "created_at">;

const postUser: RequestHandler<null, PostUserBody> = async (body) => {
  const cookieStore = cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/user`, {
    method: "POST",
    headers: {
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(body),
  });

  const { data } = (await res.json()) as RequestResponse<null>;

  revalidateTag(API_GET_USER_KEY);

  return data;
};

export default postUser;
