import { NextRequest, NextResponse } from "next/server";
import User from "@/app/model/UserModel";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { verifyToken } = reqBody;
    const tokenUser = await User.findOne({
      verifyToken,
      verifyTokenExpiry: {
        $gt: Date.now(),
      },
    });
    if (!tokenUser) {
      return NextResponse.json({
        msg: "Token Session Expired.",
        statusCode: 404,
      });
    }

    tokenUser.isVerified = true;
    tokenUser.verifyToken = undefined;
    tokenUser.verifyTokenExpiry = undefined;
    await tokenUser.save();
    return NextResponse.json({ msg: "Email Verified.", statusCode: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error });
  }
}
