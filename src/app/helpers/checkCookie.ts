import { NextRequest } from "next/server";

export function checkCookie(request: NextRequest) {
  const cookie = request.cookies.get("loginToken");

  if (cookie) {
    return cookie.value;
  }
  return null;
}
