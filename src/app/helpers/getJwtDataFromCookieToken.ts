import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
export function getJwtDataFromCookieToken(request: NextRequest) {
  try {
    const cookieToken = request.cookies.get("loginToken")?.value || "";
    const jwtTokenData = jwt.verify(cookieToken, process.env.JWT_SECRET_KEY!);
    if (jwtTokenData) {
      return jwtTokenData;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
