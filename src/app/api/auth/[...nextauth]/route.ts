import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password!;
        try {
          await connectDB();
          const userFound = await User.findOne({ email }).select("+password");
          if (!userFound) return null;

          const matchPassword = await bcrypt.compare(
            password,
            userFound.password
          );

          if (!matchPassword) return null;

          return {
            id: userFound._id,
            name: userFound.fullname,
            email: userFound.email,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
};
const handler = NextAuth(options);

export { handler as GET, handler as POST };
