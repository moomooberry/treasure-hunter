import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";

import { createSupabaseFromServer } from "@src/libs/supabase/server";
import { RequestErrorResponse, RequestResponse } from "@src/types/api";
import { GetImageCommonResponse } from "@src/types/api/image";
import { v4 } from "uuid";

export async function POST(request: NextRequest) {
  const file = await request.formData();
  console.log("file", file);

  const supabase = createSupabaseFromServer();

  /* 1. Get Auth */
  const auth = await supabase.auth.getUser();

  if (auth.error) {
    console.error("auth.error", auth.error);
    const result: RequestErrorResponse = {
      code: 404,
      message: "no resource",
      data: undefined,
    };

    return NextResponse.json(result, { status: 404 });
  }

  /* 2. Upload Image */
  const storage = await supabase.storage
    .from("public_image")
    .upload(`treasure/${v4()}`, file);

  if (storage.error) {
    console.error("storage.error", storage.error);
    const result: RequestErrorResponse = {
      code: 404,
      message: "failed upload",
      data: undefined,
    };

    return NextResponse.json(result, { status: 404 });
  }

  const result: RequestResponse<GetImageCommonResponse> = {
    code: 200,
    message: "success",
    data: {
      path: `${
        process.env.NEXT_PUBLIC_SUPABASE_URL
      }/storage/v1/object/public/public_image/${
        storage.data.path
      }?updatedAt=${dayjs().valueOf()}`,
    },
  };

  return NextResponse.json(result, { status: 200 });
}
