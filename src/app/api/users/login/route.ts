import User from "@/app/model/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
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

    return NextResponse.json({ msg: "loggedIn", statusCode: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error });
  }
}
