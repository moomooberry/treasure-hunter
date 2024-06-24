"use server";

import { cookies } from "next/headers";
import { RequestHandler, RequestResponse } from "@src/types/api";
import { GetImageCommonResponse } from "@src/types/api/image";

interface PostImageTreasureParameter {
  formData: FormData;
}

const postImageTreasure: RequestHandler<
  GetImageCommonResponse,
  PostImageTreasureParameter
> = async ({ formData }) => {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/image/treasure`,
    {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
      },
      body: formData,
    }
  );

  const { data } =
    (await res.json()) as RequestResponse<GetImageCommonResponse>;

  return data;
};

export default postImageTreasure;
