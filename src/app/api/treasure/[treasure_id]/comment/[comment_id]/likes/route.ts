import { createSupabaseFromServer } from "@src/libs/supabase/server";
import { RequestErrorResponse, RequestResponse } from "@src/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _: NextRequest,
  {
    params: { treasure_id, comment_id },
  }: { params: { treasure_id: string; comment_id: string } }
) {
  const supabase = createSupabaseFromServer();

  const { status, statusText, error } = await supabase
    .from("treasure_comment_likes")
    .insert({
      comment_id,
      treasure_id,
    });

  if (error) {
    console.error(error);
    const result: RequestErrorResponse = {
      code: status,
      message: error.message,
      data: undefined,
    };

    return NextResponse.json(result, { status });
  }

  /* Comment Update */
  const rpc = await supabase.rpc("treasure_comment_likes_count_up", {
    x: 1,
    row_id: comment_id,
  });

  if (rpc.error) {
    console.error(rpc.error);
    const result: RequestErrorResponse = {
      code: rpc.status,
      message: rpc.error.message,
      data: undefined,
    };

    return NextResponse.json(result, { status: rpc.status });
  }

  const result: RequestResponse<null> = {
    code: status,
    message: statusText,
    data: null,
  };

  return NextResponse.json(result, { status: 200 });
}
