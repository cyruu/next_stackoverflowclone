import User from "@/app/model/UserModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId } = reqBody;
    const userDetails = await User.findOne(
      {
        _id: new mongoose.Types.ObjectId(String(userId)),
      },
      {
        username: 1,
        email: 1,
      }
    );
    if (userDetails) {
      return NextResponse.json({
        msg: "User found",
        statusCode: 200,
        userDetails,
      });
    }
    return NextResponse.json({
      msg: "User not found",
      statusCode: 404,
      userDetails,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      msg: "db failed",
      statusCode: 404,
      error: error,
    });
  }
}
