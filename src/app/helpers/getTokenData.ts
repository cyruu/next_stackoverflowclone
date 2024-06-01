import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
  try {
    const loginToken = request.cookies.get("loginToken")?.value;
    console.log("checking token inside getToken", loginToken);
    //document token
    const t = document.cookie;
    console.log("document cookie ", t);

    if (loginToken) {
      const loginTokenData = jwt.verify(
        loginToken,
        process.env.JWT_SECRET_KEY!
      ) as JwtPayload;

      return loginTokenData.id;
    }
    console.log("token not found");

    return null;
  } catch (error) {
    return "error";
  }
};
