import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      msg: "Logout successs",
      statusCode: 200,
    });

    response.cookies.set("loginToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json({ msg: "failed logout", statusCode: 404 });
  }
}
