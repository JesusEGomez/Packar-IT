import { NextResponse } from "next/server";
import twilio from 'twilio';

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    const message = await client.messages.create({
      to: phoneNumber,
      from: process.env.TWILIO_NUMBER,
      body: "Tu código de verificación es: 123456",
    });

    console.log("Mensaje enviado:", message.sid);
    return NextResponse.json({ message: "created" });
} catch (error: any) {
    console.error("Error al enviar el mensaje:", error);
    return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
}
