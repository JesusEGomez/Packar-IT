import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";

import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import Profile from "@/models/perfil";

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
        console.log("credentials", credentials);
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

          // Crear o recuperar perfil asociado al usuario
          let profile = await Profile.findOne({ userId: userFound._id });

          if (!profile) {
            // Si el perfil no existe, lo creamos
            profile = new Profile({
              userId: userFound._id,
              city: "no definido",
              phoneNumber: 0,
              driverLicense: {
                frontPhoto: "ruta/de/tu/imagDen/front.jpg",
                backPhoto: "",
              },
              idDocument: {
                type: "DNI",
                number: "123456578",
                frontPhoto: "ruta/de/tu/imagen/front_id.jpg",
                backPhoto: "jpg",
              },
            });
            await profile.save();
          }

          return {
            id: userFound._id,
            name: userFound.fullname,
            email: userFound.email,
            userId: profile.userId,
            driverLicense: profile.driverLicense,
            idDocument: profile.idDocument,
            city: profile.city,
            phoneNumber: profile.phoneNumber,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
};

export const handler = NextAuth(options);

export { handler as GET, handler as POST };
