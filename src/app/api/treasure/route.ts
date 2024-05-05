import { createSupabaseFromServer } from "@src/libs/supabase/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
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
  )
    return NextResponse.json({
      data: undefined,
    });

  const pageNumber = Number(pageNumberFromRequest);
  const pageSize = Number(pageSizeFromRequest);
  // TODO Position distance 3000m로 제한하기 -> Logic
  const lat = Number(latFromRequest);
  const lng = Number(lngFromRequest);
  const distance = Number(distanceFromRequest);

  const offset = pageSize * (pageNumber - 1);

  const supabase = createSupabaseFromServer();

  const data = await supabase
    .from("treasure")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  return NextResponse.json(data);
}
