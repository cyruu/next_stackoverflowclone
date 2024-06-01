import User from "@/app/model/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/app/dbConfig/dbConfig";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const loggedInUser = await User.findOne({ email, isVerified: true });
    // user not found
    if (!loggedInUser) {
      return NextResponse.json({ msg: "User not found.", statusCode: 404 });
    }
    const passwordMatch = await bcryptjs.compare(
      password,
      loggedInUser.password
    );
    // incorrect password
    if (!passwordMatch) {
      return NextResponse.json({ msg: "Incorrect password.", statusCode: 404 });
    }
    // valid user logged in
    // create a jwt token
    const jwtTokenData = {
      id: loggedInUser._id,
      username: loggedInUser.username,
    };
    const jwtToken = jwt.sign(jwtTokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1h",
    });
    // create a response
    const response = NextResponse.json({
      msg: "loggedIn",
      statusCode: 200,
      loggedInUser: jwtTokenData,
    });
    response.cookies.set("loginToken", jwtToken, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ msg: "Db connection error", statusCode: 404 });
  }
}
