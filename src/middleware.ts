import { type NextRequest } from "next/server";
import { updateSession } from "@src/libs/supabase/middleware";
import {
  DEVICE_SAFE_AREA_TOP_KEY,
  DEVICE_SAFE_AREA_BOTTOM_KEY,
  DEVICE_OS_KEY,
} from "./constants/device";

export async function middleware(request: NextRequest) {
  let safeAreaTop = request.cookies.get(DEVICE_SAFE_AREA_TOP_KEY)?.value;
  let safeAreaBottom = request.cookies.get(DEVICE_SAFE_AREA_BOTTOM_KEY)?.value;
  let os = request.cookies.get(DEVICE_OS_KEY)?.value;

  if (safeAreaTop && safeAreaBottom && os) {
    const response = await updateSession(request);
    return response;
  }

  /* initial set request cookie from header */
  const safeAreaTopFromHeader = request.headers.get(DEVICE_SAFE_AREA_TOP_KEY);
  const safeAreaBottomFromHeader = request.headers.get(
    DEVICE_SAFE_AREA_BOTTOM_KEY
  );
  const osFromHeader = request.headers.get(DEVICE_OS_KEY);

  safeAreaTop = safeAreaTopFromHeader ?? "0";
  safeAreaBottom = safeAreaBottomFromHeader ?? "0";
  os =
    osFromHeader === "ANDROID" || osFromHeader === "IOS" ? osFromHeader : "WEB";

  request.cookies.set(DEVICE_SAFE_AREA_TOP_KEY, safeAreaTop);
  request.cookies.set(DEVICE_SAFE_AREA_BOTTOM_KEY, safeAreaBottom);
  request.cookies.set(DEVICE_OS_KEY, os);

  const response = await updateSession(request);

  /* set response cookie  */
  response.cookies.set(DEVICE_SAFE_AREA_TOP_KEY, safeAreaTop);
  response.cookies.set(DEVICE_SAFE_AREA_BOTTOM_KEY, safeAreaBottom);
  response.cookies.set(DEVICE_OS_KEY, os);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */

    // "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
