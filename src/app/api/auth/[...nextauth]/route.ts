import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "@/libs/mongodb"
import User from "@/models/user"
import bcrypt from "bcrypt"


const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" },
                
            },
            async authorize(credentials, req) {
                    const { email, password } = credentials;
                try {
                    await connectDB();
                    const userFound = await User.findOne({ email }).select('+password');                    
                    if (!userFound) return null;
            
                    const matchPassword = await bcrypt.compare(password, userFound.password);
            
                    if (!matchPassword) return null;
            
                    return {
                        id: userFound._id,
                        name: userFound.fullname,
                        email: userFound.email,
                    };
                } catch (error) {
                    console.log(error);
                }
            }
        })
    ],


}
const handler = NextAuth(options) 

export { handler as GET, handler as POST }

