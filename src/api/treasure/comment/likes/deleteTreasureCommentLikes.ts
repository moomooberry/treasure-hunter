"use server";

import {
  API_GET_TREASURE_COMMENT_LIST_KEY,
  API_GET_TREASURE_COMMENT_REPLY_LIST_KEY,
} from "@src/libs/fetch/key/treasure/comment";
import { RequestHandler, RequestResponse } from "@src/types/api";
import variableAssignment from "@src/utils/variableAssignment";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface DeleteTreasureCommentLikesParameter {
  treasure_id: string;
  comment_id: string;
  likes_id: string;
  parentCommentId?: string;
}

const deleteTreasureCommentLikes: RequestHandler<
  null,
  DeleteTreasureCommentLikesParameter
> = async ({ comment_id, treasure_id, likes_id, parentCommentId }) => {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/treasure/${treasure_id}/comment/${comment_id}/likes/${likes_id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  const { data } = (await res.json()) as RequestResponse<null>;
  if (parentCommentId) {
    revalidateTag(
      variableAssignment(API_GET_TREASURE_COMMENT_REPLY_LIST_KEY, {
        treasure_id,
        comment_id: parentCommentId,
      })
    );
  }
  revalidateTag(
    variableAssignment(API_GET_TREASURE_COMMENT_LIST_KEY, {
      treasure_id,
    })
  );

  return data;
};

export default deleteTreasureCommentLikes;
