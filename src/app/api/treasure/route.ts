import { PostTreasureBody } from "@src/api/treasure/postTreasure";
import { createSupabaseFromServer } from "@src/libs/supabase/server";
import {
  RequestErrorResponse,
  RequestPaginationResponse,
  RequestResponse,
} from "@src/types/api";
import { GetTreasureListResponse } from "@src/types/api/treasure";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const pageNumberFromRequest = request.nextUrl.searchParams.get("pageNumber");
  const pageSizeFromRequest = request.nextUrl.searchParams.get("pageSize");
  const latFromRequest = request.nextUrl.searchParams.get("lat");
  const lngFromRequest = request.nextUrl.searchParams.get("lng");
  const distanceFromRequest = request.nextUrl.searchParams.get("distance");

  if (
    !pageNumberFromRequest ||
    !pageSizeFromRequest ||
    !latFromRequest ||
    !lngFromRequest ||
    !distanceFromRequest
  ) {
    const result: RequestErrorResponse = {
      code: 404,
      message: "no resource",
      data: undefined,
    };

    return NextResponse.json(result, { status: 404 });
  }

  const pageNumber = Number(pageNumberFromRequest);
  const pageSize = Number(pageSizeFromRequest);

  // TODO Position distance 3000m로 제한하기 -> Logic
  const lat = Number(latFromRequest);
  const lng = Number(lngFromRequest);
  const distance = Number(distanceFromRequest);

  const offset = pageSize * (pageNumber - 1);

  const supabase = createSupabaseFromServer();

  const { data, status, statusText, count, error } = (await supabase
    .from("treasure")
    .select(
      `
      id,
      created_at,
      lat,
      lng,
      images,
      title,
      hint,
      end_date,
      reward,
      is_found,
      answer_user_id,
      answer_comment_id,
      user:user_id (username)
      `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1)) as PostgrestSingleResponse<
    GetTreasureListResponse[]
  >;

  if (!data || error) {
    console.error(error);
    const result: RequestErrorResponse = {
      code: status,
      message: error.message,
      data: undefined,
    };

    return NextResponse.json(result, { status });
  }

  const result: RequestPaginationResponse<GetTreasureListResponse[]> = {
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

export async function POST(request: NextRequest) {
  const newData = (await request.json()) as PostTreasureBody;

  const supabase = createSupabaseFromServer();

  const end_date = dayjs().add(7, "day").valueOf();

  const treasure = await supabase
    .from("treasure")
    .insert({ ...newData, end_date });

  if (treasure.error) {
    console.error("treasure.error", treasure.error);
    const result: RequestErrorResponse = {
      code: treasure.status,
      message: treasure.error.message,
      data: undefined,
    };

    return NextResponse.json(result, { status: treasure.status });
  }

  const result: RequestResponse<null> = {
    code: 200,
    message: "success",
    data: null,
  };

  return NextResponse.json(result, { status: 200 });
}
