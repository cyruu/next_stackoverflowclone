import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
  try {
    const loginToken = request.cookies.get("loginToken")?.value;
    if (loginToken) {
      const loginTokenData = jwt.verify(
        loginToken,
        process.env.JWT_SECRET_KEY!
      ) as JwtPayload;

      return loginTokenData.id;
    }
    return "cookies not set in application";
  } catch (error) {
    return "error";
  }
};
