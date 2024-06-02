import { PostUserBody } from "@src/api/user/postUser";
import { createSupabaseFromServer } from "@src/libs/supabase/server";
import { RequestErrorResponse, RequestResponse } from "@src/types/api";
import { GetUserResponse } from "@src/types/api/user";
import { User } from "@src/types/user";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = createSupabaseFromServer();

  /* 1. AUTH */
  const auth = await supabase.auth.getUser();

  if (!auth.data.user || auth.error) {
    console.error("auth.error", auth.error);
    const result: RequestErrorResponse = {
      code: 404,
      message: "no resource",
      data: undefined,
    };

    return NextResponse.json(result, { status: 404 });
  }

  /* 2. User */
  const user = (await supabase
    .from("user")
    .select("*")
    .eq("id", auth.data.user.id)) as PostgrestSingleResponse<User[]>;

  if (!user.data || user.error) {
    console.error("user.error", user.error);
    const result: RequestErrorResponse = {
      code: user.status,
      message: "user error",
      data: undefined,
    };

    return NextResponse.json(result, { status: user.status });
  }

  /* 3. Seeking Count */
  const seeking = await supabase
    .from("treasure")
    .select("answer_user_id", { count: "exact" })
    .eq("answer_user_id", user.data[0].id);

  if (typeof seeking.count !== "number" || seeking.error) {
    console.error("seeking.error", seeking.error);
    const result: RequestErrorResponse = {
      code: seeking.status,
      message: "seeking error",
      data: undefined,
    };

    return NextResponse.json(result, { status: seeking.status });
  }

  /* 4. Hiding Count */
  const hiding = await supabase
    .from("treasure")
    .select("user_id", { count: "exact" })
    .eq("user_id", user.data[0].id);

  if (typeof hiding.count !== "number" || hiding.error) {
    console.error("hiding.error", hiding.error);
    const result: RequestErrorResponse = {
      code: hiding.status,
      message: "no resource",
      data: undefined,
    };

    return NextResponse.json(result, { status: hiding.status });
  }

  const data = {
    ...user.data[0],
    seeking_count: seeking.count,
    hiding_count: hiding.count,
  };

  const result: RequestResponse<GetUserResponse | null> = {
    code: 200,
    message: "success",
    data: user.data.length === 0 ? null : data,
  };

  return NextResponse.json(result, { status: 200 });
}

export async function POST(request: NextRequest) {
  const newData = (await request.json()) as PostUserBody;

  const supabase = createSupabaseFromServer();

  const { status, statusText, error } = await supabase
    .from("user")
    .insert(newData);

  if (error) {
    console.error(error);
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
