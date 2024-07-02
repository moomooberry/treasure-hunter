import { PutTreasureBody } from "@src/api/treasure/putTreasure";
import { createSupabaseFromServer } from "@src/libs/supabase/server";
import { RequestErrorResponse, RequestResponse } from "@src/types/api";
import { GetTreasureDetailResponse } from "@src/types/api/treasure";
import { TreasureItem } from "@src/types/treasure";
import {
  PostgrestMaybeSingleResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params: { treasure_id } }: { params: { treasure_id: string } }
) {
  const supabase = createSupabaseFromServer();

  const { data, status, statusText } = (await supabase
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
      user:user_id (id, username, profile_image)
      `
    )
    .eq("id", treasure_id)) as PostgrestMaybeSingleResponse<
    GetTreasureDetailResponse[]
  >;

  if (!data || data.length === 0) {
    const result: RequestErrorResponse = {
      code: status,
      message: statusText,
      data: undefined,
    };

    return NextResponse.json(result, { status });
  }

  const result: RequestResponse<GetTreasureDetailResponse> = {
    code: status,
    message: statusText,
    data: data[0],
  };

  return NextResponse.json(result, { status: 200 });
}

export async function DELETE(
  _: NextRequest,
  { params: { treasure_id } }: { params: { treasure_id: string } }
) {
  const supabase = createSupabaseFromServer();

  /* 1. Get Treasure */
  const treasure = (await supabase
    .from("treasure")
    .select("*")
    .eq("id", treasure_id)
    .single()) as PostgrestSingleResponse<TreasureItem>;

  if (!treasure.data || treasure.error) {
    console.error("treasure.error", treasure.error);
    const result: RequestErrorResponse = {
      code: 404,
      message: "no resource",
      data: undefined,
    };

    return NextResponse.json(result, { status: 404 });
  }

  /* 2. Delete Treasure */
  const deletedTreasure = await supabase
    .from("treasure")
    .delete()
    .eq("id", treasure_id);

  if (deletedTreasure.error) {
    console.error("deletedTreasure.error", deletedTreasure.error);
    const result: RequestErrorResponse = {
      code: deletedTreasure.status,
      message: deletedTreasure.error.message,
      data: undefined,
    };

    return NextResponse.json(result, { status: deletedTreasure.status });
  }

  /* 3. Delete Treasure Image */
  const imageNameList = treasure.data.images.map(
    (path) => path.split("?")[0].split("public_image/")[1]
  );

  const deletedImage = await supabase.storage
    .from("public_image")
    .remove(imageNameList);

  if (deletedImage.error) {
    console.error("deletedImage.error", deletedImage.error);
    const result: RequestErrorResponse = {
      code: 404,
      message: "deletedImage.error",
      data: undefined,
    };

    return NextResponse.json(result, { status: 404 });
  }

  const result: RequestResponse<null> = {
    code: 200,
    message: "success",
    data: null,
  };

  return NextResponse.json(result, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params: { treasure_id } }: { params: { treasure_id: string } }
) {
  const { images, ...newData } = (await request.json()) as PutTreasureBody;

  const supabase = createSupabaseFromServer();

  const tmpImagePathList: string[] = [];
  const tmpImageNameList: string[] = [];

  const originImagePathList: string[] = [];
  const originImageNameList: string[] = [];

  const newImagePathList: string[] = [];

  images.forEach((src) => {
    if (src.includes("public_image/tmp")) {
      tmpImagePathList.push(src);
      tmpImageNameList.push(src.split("?")[0].split("public_image/")[1]);
    } else {
      originImagePathList.push(src);
      originImageNameList.push(src.split("?")[0].split("public_image/")[1]);
    }
  });

  /* 1. Prev Treasure */
  const prevTreasure = (await supabase
    .from("treasure")
    .select("*")
    .eq("id", treasure_id)
    .single()) as PostgrestSingleResponse<TreasureItem>;

  if (prevTreasure.error) {
    console.error("prevTreasure.error", prevTreasure.error);
    const result: RequestErrorResponse = {
      code: 404,
      message: "no resource",
      data: undefined,
    };
    return NextResponse.json(result, { status: 404 });
  }

  /* 2. Move Treasure Image Tmp */
  const originNumberList = originImageNameList.map((name) =>
    Number(name.split("/image_")[1])
  );

  const originMaxNumber = Math.max(...originNumberList);

  for (let i = 0; i < tmpImageNameList.length; i++) {
    const newName = `treasure/${treasure_id}/image_${originMaxNumber + 1 + i}`;

    const movedImage = await supabase.storage
      .from("public_image")
      .move(tmpImageNameList[i], newName);

    if (movedImage.error) {
      console.error("movedImage.error", movedImage.error);
      const result: RequestErrorResponse = {
        code: 404,
        message: "movedImage.error",
        data: undefined,
      };

      return NextResponse.json(result, { status: 404 });
    }

    newImagePathList.push(
      `${
        process.env.NEXT_PUBLIC_SUPABASE_URL
      }/storage/v1/object/public/public_image/${newName}?updatedAt=${dayjs().valueOf()}`
    );
  }

  /* 3. Update Treasure */
  const updatedTreasure = await supabase
    .from("treasure")
    .update({
      images: [...originImagePathList, ...newImagePathList],
      ...newData,
    })
    .eq("id", treasure_id);

  if (updatedTreasure.error) {
    console.error("updatedTreasure.error", updatedTreasure.error);
    const result: RequestErrorResponse = {
      code: updatedTreasure.status,
      message: updatedTreasure.error.message,
      data: undefined,
    };

    return NextResponse.json(result, { status: updatedTreasure.status });
  }

  /* 4. Delete Treasure Image */
  const deleteImageNameList = prevTreasure.data.images
    .filter((image) => !originImagePathList.includes(image))
    .map((path) => path.split("?")[0].split("public_image/")[1]);

  for (let i = 0; i < deleteImageNameList.length; i++) {
    const deletedImage = await supabase.storage
      .from("public_image")
      .remove(deleteImageNameList);

    if (deletedImage.error) {
      console.error("deletedImage.error", deletedImage.error);
      const result: RequestErrorResponse = {
        code: 404,
        message: "deletedImage.error",
        data: undefined,
      };

      return NextResponse.json(result, { status: 404 });
    }
  }

  const result: RequestResponse<null> = {
    code: 200,
    message: "success",
    data: null,
  };

  return NextResponse.json(result, { status: 200 });
}
