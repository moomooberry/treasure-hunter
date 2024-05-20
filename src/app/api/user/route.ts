import { createSupabaseFromServer } from "@src/libs/supabase/server";
import { RequestErrorResponse, RequestResponse } from "@src/types/api";
import { User } from "@src/types/user";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createSupabaseFromServer();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (!userData.user || userError) {
    const result: RequestErrorResponse = {
      code: 404,
      message: "no resource",
      data: undefined,
    };

    return NextResponse.json(result, { status: 404 });
  }

  const { data, status, statusText, error } = (await supabase
    .from("user")
    .select("*")
    .eq("userId", userData.user.id)) as PostgrestSingleResponse<User[]>;

  if (!data || error) {
    const result: RequestErrorResponse = {
      code: status,
      message: error.message,
      data: undefined,
    };

    return NextResponse.json(result, { status });
  }

  const result: RequestResponse<User | null> = {
    code: status,
    message: statusText,
    data: data.length === 0 ? null : data[0],
  };

  return NextResponse.json(result, { status: 200 });
}
