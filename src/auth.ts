import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connect } from "./app/dbConfig/dbConfig";
import User from "./app/model/UserModel";
import bcryptjs from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "text" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;

        // Ensure email and password are defined
        if (!email || !password) {
          throw new Error("Email and password must be provided");
        }

        await connect();

        const user = await User.findOne({ email, isVerified: true });

        // // Check if user exists
        if (!user) {
          throw new Error("User not found");
        }

        // // Check password match
        const passMatch = await bcryptjs.compare(
          String(password),
          user.password
        );

        if (!passMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.userId = user._id?.toString();
      }

      return token;
    },
    session: async ({ session, token }) => {
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
