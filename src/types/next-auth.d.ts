// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
    email?: string;
    _id?: string;
  }

  interface Session {
    user: {
      username?: string;
      email?: string;
      _id?: string;
    };
  }

  interface JWT {
    username?: string;
    email?: string;
    id: string;
  }
}
