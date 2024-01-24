import { NextResponse } from "next/server";
import twilio from 'twilio';
import {connectDB} from "@/libs/mongodb"
import User from "@/models/user";

let verificationData = new Map();

export async function POST(request: Request) {
  console.log("Verificación inicial:", verificationData);

  try {
    const { phoneNumber, code, action, email } = await request.json();
    console.log(phoneNumber, code, action, email); 

    await connectDB();


    if (action === "sendCode") {
      return handleSendCode(request, email, phoneNumber, code);
    } else if (action === "verifyCode") {
      return handleVerifyCode(request, email, phoneNumber, code); 
    } else {
      console.error("Acción no válida");
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error en la solicitud:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function handleSendCode(request: Request, email: string, phoneNumber: string, client: any) {
  try {
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    verificationData.set(email, { code: verificationCode, verified: false });
    console.log("Datos almacenados en verificationData:", verificationData);
    
    const user = await User.findOne({ email });
    if (user) {
      user.smsCode = verificationCode;
      await user.save();
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    const message = await client.messages.create({
      to: phoneNumber,
      from: process.env.TWILIO_NUMBER,
      body: `Tu código de verificación es: ${verificationCode}`,
    });

    console.log("Mensaje enviado:", message.sid);
    return NextResponse.json({ message: "created", verificationCode });
  } catch (error) {
    console.error("Error al enviar el código:", error);
    return NextResponse.json(
      { message: "Error sending verification code" },
      { status: 500 }
    );
  }
}
async function handleVerifyCode(request: Request, email: string, phoneNumber: string, providedCode: any) {
  try {

    console.log(providedCode);
    console.log("Buscando usuario con email:", email);

    const user = await User.findOne({ email });
    console.log(user);

    if (providedCode === user.smsCode) {
      return NextResponse.json({ message: "Verification successful" });
    } else {
      console.error("Código incorrecto o ya verificado");
      return NextResponse.json({ message: "Invalid verification code" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error al verificar el código:", error);
    return NextResponse.json(
      { message: "Error verifying verification code" },
      { status: 500 }
    );
  }
}
