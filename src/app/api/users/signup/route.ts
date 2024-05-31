import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/model/UserModel";
import { sendEmailVerification } from "@/app/nodemailer/nodemailer";
import { verificationType } from "@/app/enums/verification";
import bcryptjs from "bcryptjs";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // check if email already exists
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return NextResponse.json({ msg: "User already exists", statusCode: 409 });
    }
    // hash the password using bcryptjs
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // // creating a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // add user to database
    const savedUser = await newUser.save();
    const res = await sendEmailVerification({
      email,
      id: savedUser._id,
      emailType: verificationType.emailVerification,
    });

    return NextResponse.json({
      msg: "Account Created. Verify it.",
      statusCode: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ msg: error });
  }
}
