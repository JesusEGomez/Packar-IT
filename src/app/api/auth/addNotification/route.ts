import { connectDB } from "@/libs/mongodb";
import Profile from "@/models/perfil";
import Notification from "@/models/notifications";
import { NextResponse, NextRequest } from "next/server";

import { sendNotification } from "../../ably/Notifications";
import { INotification } from "@/app/interfaces/notifications.interface";

export async function POST(request: Request) {
  try {
    await connectDB();
    const notification = await request.json();

    //console.log(notification);
    const newNotification = await new Notification(notification);
    //console.log(notification.driver.usuario._id);

    const driverId = notification.driver.usuario._id;
    await newNotification.save();

    //console.log(newNotification);
    const driver = await Profile.findOne({ userId: driverId });
    //console.log(driver);

    if (!driver) {
      return NextResponse.json(
        { message: "Perfil no encontrado" },
        { status: 404 }
      );
    }

    driver.notifications.push(newNotification);
    const saved = await driver.save();
    //console.log(saved);
    sendNotification(driver._id, { content: newNotification.estado });
    return NextResponse.json(newNotification);
  } catch (error) {
    //console.error(error);
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
    //console.log(`id: ${id}, estado: ${estado}`);
    const notification: INotification | null = await Notification.findById(id);
    if (!notification)
      return NextResponse.json(
        { message: "Notificación no encontrada" },
        { status: 400 }
      );
    notification.type = "respuestaServicio";
    notification.estado = estado;
    const receptor = await Profile.findById(notification.usuario?._id);
    receptor.notifications.push(notification);
    const saved = await receptor.save();

    //console.log(receptor);

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
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    const type: string | null = request.nextUrl.searchParams.get("type");
    //console.log(`id: ${id}, type: ${type}`);
    if (!id || !type)
      return NextResponse.json({ message: "Faltan datos" }, { status: 400 });
    const notifications = await Notification.find({
      [type]: id,
    }).lean();
    //console.log(notifications);
    return NextResponse.json(notifications);
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
