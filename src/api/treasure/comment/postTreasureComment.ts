"use server";

import { cookies } from "next/headers";
import { RequestHandler, RequestResponse } from "@src/types/api";
import { revalidateTag } from "next/cache";
import variableAssignment from "@src/utils/variableAssignment";
import { API_GET_TREASURE_COMMENT_LIST_KEY } from "@src/libs/fetch/key/treasure/comment";

export interface PostTreasureCommentBody {
  text: string;
}

interface PostTreasureCommentParameter extends PostTreasureCommentBody {
  treasure_id: string;
}

const postTreasureComment: RequestHandler<
  null,
  PostTreasureCommentParameter
> = async ({ treasure_id, ...rest }) => {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/treasure/${treasure_id}/comment`,
    {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(rest),
    }
  );

  const { data } = (await res.json()) as RequestResponse<null>;

  revalidateTag(
    variableAssignment(API_GET_TREASURE_COMMENT_LIST_KEY, { treasure_id })
  );

  return data;
};

export default postTreasureComment;
