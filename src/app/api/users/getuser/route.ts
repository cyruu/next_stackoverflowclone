import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/app/helpers/getTokenData";
import jwt from "jsonwebtoken";
import User from "@/app/model/UserModel";
// import { checkCookie } from "@/app/helpers/checkCookie";
// import { getJwtDataFromCookieToken } from "@/app/helpers/getJwtDataFromCookieToken";
//test
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

//main
export async function GET(request: NextRequest) {
  const jwtTokenData = getJwtDataFromCookieToken(request);
  try {
    // const cookieToken = request.cookies.get("loginToken");
    // const cookieToken = {

    //   username: "cyrus",
    //   email: "cyruz.mhr09@gmail.com",
    // };

    if (jwtTokenData) {
      // extract jwtTokenData from cookieToken

      return NextResponse.json({
        msg: "User available",
        statusCode: 200,
        // cookieToken,
        jwtTokenData,
      });
    }

    return NextResponse.json({
      msg: "Not User",
      statusCode: 404,
      cookieToken: null,
    });

    //get token data
    // get email instead of _id
    // const user = getTokenData(request);

    // // userId in form of string
    // if (user) {
    //   const loggedInUser = await User.findOne(
    //     { email: user.email },
    //     { username: 1, email: 1 }
    //   );

    //   console.log("user from token and db", loggedInUser);
    //   if (loggedInUser) {
    //     return NextResponse.json({
    //       msg: "Logged in user found",
    //       loggedInUser,
    //       statusCode: 200,
    //       respUser: user,
    //     });
    //   }
    // }
    // // console.log("searched user with string id", loggedInUser);

    // return NextResponse.json({
    //   msg: "Logged in user not found",
    //   statusCode: 404,
    //   loggedInUser: null,
    //   // respUser: user,
    // });
  } catch (error: any) {
    return NextResponse.json({
      msg: "something wrong in db query",
      statusCode: 404,
      error: error,
      jwtTokenData,
    });
  }
}
