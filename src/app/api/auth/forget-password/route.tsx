import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import jwt from "jsonwebtoken";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const body: { email: string } = await request.json();
    const { email } = body;
    await connectDB();
    const userFind = await User.findOne({ email });

    if (!userFind) {
      return NextResponse.json(
        { message: "El usuario no existe" },
        { status: 400 }
      );
    }

    const tokenData = {
      email: userFind.email,
      userId: userFind._id,
    };

    const token = jwt.sign({ data: tokenData }, "secret", {
      expiresIn: "86400",
    });

    const forgetUrl = `http://localhost:3000/auth/reset-password/${token}`;

    await resend.emails.send({
      from: "onboardin@resend.dev",
      // to: email,
      to: "ciappinamaurooj@gmail.com",
      subject: "Recuperar contraseña",
      html: `<a href="${forgetUrl}">Recuperar contraseña</a>`,
    });

    return NextResponse.json({ message: "Email enviado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al enviar el email" },
      { status: 500 }
    );
  }
}
