import { NextRequest, NextResponse } from "next/server";
// logic part

export function middleware(request: NextRequest) {
  // get current path
  const path = request.nextUrl.pathname;
  // check if it is public path
  // logged in le yeta jana mildaina
  const isPublicPath = path == "/login" || path == "/signup";
  // get token
  const loginToken = request.cookies.get("loginToken");

  // set login=true in redux store
  //   if (loginToken) {

  //   }
  // logged in-> can't go to public page
  if (loginToken && isPublicPath) {
    const baseUrl = request.nextUrl.origin;
    return NextResponse.redirect(`${baseUrl}/questions`);
  }
  // not logged in-> cant access private page
  else if (!loginToken && !isPublicPath) {
    const baseUrl = request.nextUrl.origin;
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// matching part
export const config = {
  matcher: ["/login", "/signup"],
};
