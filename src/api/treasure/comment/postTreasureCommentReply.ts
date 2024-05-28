"use server";

import {
  API_GET_TREASURE_COMMENT_LIST_KEY,
  API_GET_TREASURE_COMMENT_REPLY_LIST_KEY,
} from "@src/libs/fetch/key/treasure/comment";
import { RequestHandler, RequestResponse } from "@src/types/api";
import variableAssignment from "@src/utils/variableAssignment";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export interface PostTreasureCommentReplyBody {
  text: string;
}

interface PostTreasureCommentParameter extends PostTreasureCommentReplyBody {
  treasure_id: string;
  comment_id: string;
}

const postTreasureCommentReply: RequestHandler<
  null,
  PostTreasureCommentParameter
> = async ({ treasure_id, comment_id, ...rest }) => {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/treasure/${treasure_id}/comment/${comment_id}`,
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
    variableAssignment(API_GET_TREASURE_COMMENT_REPLY_LIST_KEY, {
      treasure_id,
      comment_id,
    })
  );

  revalidateTag(
    variableAssignment(API_GET_TREASURE_COMMENT_LIST_KEY, {
      treasure_id,
    })
  );

  return data;
};

export default postTreasureCommentReply;
