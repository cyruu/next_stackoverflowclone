import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/app/helpers/getTokenData";
import User from "@/app/model/UserModel";

export async function GET(request: NextRequest) {
  try {
    //get token data
    // get email instead of _id
    const user = getTokenData(request);
    // userId in form of string
    if (user) {
      const loggedInUser = await User.findOne(
        { email: user.email },
        { username: 1, email: 1 }
      );

      if (loggedInUser) {
        return NextResponse.json({
          msg: "Logged in user found",
          loggedInUser,
          statusCode: 200,
        });
      }
    }
    // console.log("searched user with string id", loggedInUser);

    return NextResponse.json({
      msg: "Logged in user not found",
      statusCode: 404,
      loggedInUser: null,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "something wrong in db query",
      statusCode: 404,
      err: error,
    });
  }
}
