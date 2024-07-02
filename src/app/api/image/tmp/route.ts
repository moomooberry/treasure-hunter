import { createSupabaseFromServer } from "@src/libs/supabase/server";
import { RequestErrorResponse, RequestResponse } from "@src/types/api";
import { GetImageCommonResponse } from "@src/types/api/image";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function POST(request: NextRequest) {
  const file = await request.formData();

  const supabase = createSupabaseFromServer();

  /*1. Get Auth */
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
  const uploadedStorage = await supabase.storage
    .from("public_image")
    .upload(`tmp/${v4()}`, file);

  if (uploadedStorage.error) {
    console.error("uploadedStorage.error", uploadedStorage.error);
    const result: RequestErrorResponse = {
      code: 404,
      message: "failed upload",
      data: undefined,
    };

    return NextResponse.json(result, { status: 404 });
  }

  /* 3. Delete Image after 60 second */
  setTimeout(async () => {
    const deletedStorage = await supabase.storage
      .from("public_image")
      .remove([uploadedStorage.data.path]);

    if (deletedStorage.error) {
      console.error("deletedStorage.error", deletedStorage.error);
      console.error("deletedStorage.error imageId", uploadedStorage.data.path);
    }
  }, 1000 * 60);

  const result: RequestResponse<GetImageCommonResponse> = {
    code: 200,
    message: "success",
    data: {
      path: `${
        process.env.NEXT_PUBLIC_SUPABASE_URL
      }/storage/v1/object/public/public_image/${
        uploadedStorage.data.path
      }?updatedAt=${dayjs().valueOf()}`,
    },
  };

  return NextResponse.json(result, { status: 200 });
}
