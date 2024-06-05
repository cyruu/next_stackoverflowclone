import { signOut } from "@/auth";
import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  try {
    console.log("mamba out in api");
    const res = await signOut({
      redirect: false,
    });
    if (res) {
      return NextResponse.json({
        msg: "Mamba Out!",
        statusCode: 200,
      });
    }
    return NextResponse.json({ msg: "failed logout", statusCode: 404 });
  } catch (error) {
    return NextResponse.json({
      msg: "failed logout in catch of logout api",
      statusCode: 404,
    });
  }
}
