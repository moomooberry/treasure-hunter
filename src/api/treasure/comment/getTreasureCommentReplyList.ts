"use server";

import { API_GET_TREASURE_COMMENT_REPLY_LIST_KEY } from "@src/libs/fetch/key/treasure/comment";
import {
  RequestHandler,
  RequestPaginationParameter,
  RequestPaginationResponse,
} from "@src/types/api";
import { GetTreasureCommentReplyListResponse } from "@src/types/api/treasure/comment";
import variableAssignment from "@src/utils/variableAssignment";
import { cookies } from "next/headers";

interface GetTreasureReplyCommentParameter {
  treasure_id: string;
  comment_id: string;
}

const getTreasureCommentReplyList: RequestHandler<
  RequestPaginationResponse<GetTreasureCommentReplyListResponse[]>,
  RequestPaginationParameter<GetTreasureReplyCommentParameter>
> = async ({ treasure_id, comment_id, pageNumber, pageSize }) => {
  const cookieStore = cookies();

  const key = variableAssignment(API_GET_TREASURE_COMMENT_REPLY_LIST_KEY, {
    treasure_id,
    comment_id,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}${key}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      method: "GET",
      next: {
        revalidate: 5 * 60,
        tags: [key],
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  const data = (await res.json()) as RequestPaginationResponse<
    GetTreasureCommentReplyListResponse[]
  >;

  return data;
};

export default getTreasureCommentReplyList;
