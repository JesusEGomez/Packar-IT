import { connectDB } from "@/libs/mongodb";
import Profile from "@/models/perfil";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
      await connectDB();
      const notification = await request.json();
      console.log(notification);
      const driver = await Profile.findOne({userId: notification.driver.usuario._id});
      console.log(driver);
      driver.notifications.push({data: notification, message:'se ha creado una solicitud de envio'});
      const saved = await driver.save();
      console.log(saved);
      
      return NextResponse.json(saved);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }