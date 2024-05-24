import { PostTreasureCommentBody } from "@src/api/treasure/comment/postTreasureComment";
import { createSupabaseFromServer } from "@src/libs/supabase/server";
import {
  RequestErrorResponse,
  RequestPaginationResponse,
  RequestResponse,
} from "@src/types/api";
import { GetTreasureCommentListResponse } from "@src/types/api/treasure/comment";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { treasure_id } }: { params: { treasure_id: string } }
) {
  const pageNumberFromRequest = request.nextUrl.searchParams.get("pageNumber");
  const pageSizeFromRequest = request.nextUrl.searchParams.get("pageSize");

  if (!pageNumberFromRequest || !pageSizeFromRequest) {
    const result: RequestErrorResponse = {
      code: 404,
      message: "no resource",
      data: undefined,
    };

    return NextResponse.json(result, { status: 404 });
  }

  const pageNumber = Number(pageNumberFromRequest);
  const pageSize = Number(pageSizeFromRequest);

  const offset = pageSize * (pageNumber - 1);

  const supabase = createSupabaseFromServer();

  const { data, status, statusText, count, error } = (await supabase
    .from("treasure_comment")
    .select(
      `id,
       created_at,
       is_answer,
       text,
       child_count,
       user:user_id (id, username)
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .eq("treasure_id", treasure_id)
    .is("parent_comment_id", null)
    .range(offset, offset + pageSize - 1)) as PostgrestSingleResponse<
    GetTreasureCommentListResponse[]
  >;

  if (!data || error) {
    const result: RequestErrorResponse = {
      code: status,
      message: error.message,
      data: undefined,
    };

    return NextResponse.json(result, { status });
  }

  const result: RequestPaginationResponse<GetTreasureCommentListResponse[]> = {
    code: status,
    message: statusText,
    pagination: {
      totalElement: count ?? 0,
      pageNumber,
    },
    data,
  };

  return NextResponse.json(result, { status: 200 });
}

export async function POST(
  request: NextRequest,
  { params: { treasure_id } }: { params: { treasure_id: string } }
) {
  const body = (await request.json()) as PostTreasureCommentBody;

  const supabase = createSupabaseFromServer();

  const { status, statusText, error } = await supabase
    .from("treasure_comment")
    .insert({ treasure_id, ...body });

  if (error) {
    const result: RequestErrorResponse = {
      code: status,
      message: error.message,
      data: undefined,
    };

    return NextResponse.json(result, { status });
  }

  const result: RequestResponse<null> = {
    code: status,
    message: statusText,
    data: null,
  };

  return NextResponse.json(result, { status: 200 });
}
