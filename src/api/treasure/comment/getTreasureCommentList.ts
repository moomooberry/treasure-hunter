"use server";

import { API_GET_TREASURE_COMMENT_LIST_KEY } from "@src/libs/fetch/key/treasure/comment";
import {
  RequestHandler,
  RequestPaginationParameter,
  RequestPaginationResponse,
} from "@src/types/api";
import { GetTreasureCommentListResponse } from "@src/types/api/treasure/comment";
import variableAssignment from "@src/utils/variableAssignment";
import { cookies } from "next/headers";

interface GetCommentListParameter {
  treasure_id: string;
}

const getTreasureCommentList: RequestHandler<
  RequestPaginationResponse<GetTreasureCommentListResponse[]>,
  RequestPaginationParameter<GetCommentListParameter>
> = async ({ pageNumber, pageSize, treasure_id }) => {
  const cookieStore = cookies();

  const key = variableAssignment(API_GET_TREASURE_COMMENT_LIST_KEY, {
    treasure_id,
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
    GetTreasureCommentListResponse[]
  >;

  return data;
};

export default getTreasureCommentList;
