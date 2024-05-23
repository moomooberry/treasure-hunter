import { PutTreasureBody } from "@src/api/treasure/putTreasure";
import { createSupabaseFromServer } from "@src/libs/supabase/server";
import { RequestErrorResponse, RequestResponse } from "@src/types/api";
import { TreasureItem } from "@src/types/treasure";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params: { treasureId } }: { params: { treasureId: string } }
) {
  const supabase = createSupabaseFromServer();

  const { data, status, statusText } = (await supabase
    .from("treasure")
    .select(
      `
      id,
      imgSrc,
      created_at,
      lat,
      lng,
      title,
      hint,
      reward,
      endDate,
      user (username, id)
      `
    )
    .eq("id", treasureId)) as PostgrestMaybeSingleResponse<TreasureItem[]>;

  if (!data || data.length === 0) {
    const result: RequestErrorResponse = {
      code: status,
      message: statusText,
      data: undefined,
    };

    return NextResponse.json(result, { status });
  }

  const result: RequestResponse<TreasureItem> = {
    code: status,
    message: statusText,
    data: data[0],
  };

  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(
  _: NextRequest,
  { params: { treasureId } }: { params: { treasureId: string } }
) {
  // TODO 이미지 삭제해야함
  const supabase = createSupabaseFromServer();

  const { status, statusText, error } = await supabase
    .from("treasure")
    .delete()
    .eq("id", treasureId);

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

export async function PUT(
  request: NextRequest,
  { params: { treasureId } }: { params: { treasureId: string } }
) {
  // TODO 이미지 삭제 해야함
  const newData = (await request.json()) as PutTreasureBody;

  const supabase = createSupabaseFromServer();

  const { data: prevData } = (await supabase
    .from("treasure")
    .select("*")
    .eq("id", treasureId)) as PostgrestMaybeSingleResponse<TreasureItem[]>;

  if (!prevData) {
    const result: RequestErrorResponse = {
      code: 404,
      message: "no resource",
      data: undefined,
    };
    return NextResponse.json(result, { status: 404 });
  }

  const { status, statusText, error } = await supabase
    .from("treasure")
    .update(newData)
    .eq("id", treasureId);

  console.log("Stat", typeof status);

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
