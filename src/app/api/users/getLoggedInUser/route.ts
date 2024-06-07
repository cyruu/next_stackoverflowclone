import { auth } from "@/auth";
import { decode, encode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  //   const session = await auth();
  //   const user = session?.user;
  //   console.log("session user from page.tsx", user);
  const userCookie = cookies().get("authjs.session-token");
  // console.log("cookies form page.tsx", userCookie);
  const loggedInUser = await decode({
    token: userCookie?.value!,
    salt: userCookie?.name!,
    secret: process.env.AUTH_SECRET!,
  });

  return NextResponse.json({
    msg: "getting logged in user",
    statusCode: 200,
    loggedInUser,
  });
}
