import { connectDB } from "@/libs/mongodb";
import Profile from "@/models/perfil";
import Notification from '@/models/notifications';
import { NextResponse } from "next/server";
import { sendNotification } from "../../ably/Notifications";

export async function POST(request: Request) {
  try {
      await connectDB();
      const notification = await request.json();
      //console.log(notification);
      const newNotification = await new Notification(notification);
      console.log(notification.driver.usuario._id);
      const driverId = notification.driver.usuario._id
      await newNotification.save();
      //console.log(newNotification);
      const driver = await Profile.findOne({ userId: driverId });
      //console.log(driver);
      
      if (!driver) {
        return NextResponse.json({ message: 'Perfil no encontrado' }, { status: 404 });
      }

      driver.notifications.push(newNotification);
      const saved = await driver.save();
      console.log(saved);
      sendNotification(driver._id, { content: newNotification.estado });
       return NextResponse.json(newNotification);
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

  export async function PUT(request: Request) {
    try {
      await connectDB();
      const { id, estado } = await request.json();
      const notification = await Notification.findOne({_id : id});
      notification.type = 'respuestaServicio';
      notification.estado = estado;
      const receptor = await Profile.findOne({userId: notification.usuario});
      receptor.notifications.push(notification);
      const saved = await receptor.save();

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