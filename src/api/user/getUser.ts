"use server";

import { API_GET_USER_KEY } from "@src/libs/fetch/key/user";
import { RequestHandler, RequestResponse } from "@src/types/api";
import { User } from "@src/types/user";
import { cookies } from "next/headers";

const getUser: RequestHandler<User | null> = async () => {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}${API_GET_USER_KEY}`,
    {
      method: "GET",
      next: {
        revalidate: 5 * 60,
        tags: [API_GET_USER_KEY],
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  const { data } = (await res.json()) as RequestResponse<User | null>;

  return data;
};

export default getUser;
