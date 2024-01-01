import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, profile, session, user }) {
      console.log({
        account,
        token,
        profile,
        session,
        user,
      });
      return token;
    },
    // session() {
    //  // Session callback implementation
    // },
  },
});

export { handler as GET, handler as POST };