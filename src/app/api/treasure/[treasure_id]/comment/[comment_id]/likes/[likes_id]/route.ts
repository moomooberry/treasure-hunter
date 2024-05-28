import { createSupabaseFromServer } from "@src/libs/supabase/server";
import { RequestErrorResponse, RequestResponse } from "@src/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  {
    params: { comment_id, likes_id },
  }: { params: { treasure_id: string; comment_id: string; likes_id: string } }
) {
  const supabase = createSupabaseFromServer();

  const { status, statusText, error } = await supabase
    .from("treasure_comment_likes")
    .delete()
    .eq("id", likes_id);

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
  const rpc = await supabase.rpc("treasure_comment_likes_count_down", {
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
