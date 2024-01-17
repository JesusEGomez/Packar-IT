import { NextResponse, NextRequest } from "next/server";
import twilio from 'twilio';

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    const accountSid = "AC6adc9e090d36b2dae42cf797bbfcdc20";
    const authToken = "57d2758cb452131cfe1d4c5ec7700203";
    const client = twilio(accountSid, authToken);

    const message = await client.messages.create({
      to: phoneNumber,
      from: "+12062022183",
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
