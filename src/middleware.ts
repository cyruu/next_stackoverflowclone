import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth"; // Import your auth middleware here
import { cookies } from "next/headers";
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookieUser = cookies().get("authjs.session-token");
  const path = request.nextUrl.pathname;

  const isPublic = path == "/login" || path == "/signup";
  // login cha login signup ma jana khojiracha
  if (cookieUser && isPublic) {
    console.log(
      "login cha public page jana mildaina, redireting to questions",
      path,
      cookieUser
    );

    return NextResponse.redirect(new URL("/questions", request.url));
  }
  // login chaina login signup bahek jana khojiracha
  // if (!cookieUser && !isPublic) {
  //   console.log("login chaina private mildaina", path, cookieUser);

  //   return NextResponse.redirect(new URL("/questions", request.url));
  // }

  // Call the auth middleware
  //   auth(request);

  // Redirect to "/home" URL
  //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup"],
};

// logic part

// export function middleware(request: NextRequest) {
//   request.nextUrl.searchParams.set("__nextDynamic", "true");
//   // get current path
//   const path = request.nextUrl.pathname;
//   // check if it is public path
//   // logged in le yeta jana mildaina
//   const isPublicPath = path == "/login" || path == "/signup";
//   // get token
//   const loginToken = request.cookies.get("loginToken");

//   // set login=true in redux store
//   //   if (loginToken) {

//   //   }
//   // logged in-> can't go to public page
//   if (loginToken && isPublicPath) {
//     const baseUrl = request.nextUrl.origin;
//     return NextResponse.redirect(`${baseUrl}/questions`);
//   }
//   // not logged in-> cant access private page
//   else if (!loginToken && !isPublicPath) {
//     const baseUrl = request.nextUrl.origin;
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }
// }

// // matching part
// export const config = {
//   matcher: ["/login", "/signup"],
// };
