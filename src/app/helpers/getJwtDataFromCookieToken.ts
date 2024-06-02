import jwt from "jsonwebtoken";
export function getJwtDataFromCookieToken(cookieToken: string) {
  try {
    const jwtTokenData = jwt.verify(cookieToken, process.env.JWT_SECRET_KEY!);
    if (jwtTokenData) {
      return jwtTokenData;
    }
    return null;
  } catch (error) {
    // logged in console
    console.log("error");
  }
}
