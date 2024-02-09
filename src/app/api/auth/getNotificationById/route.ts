import { connectDB } from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Notification from "@/models/notifications";
import { INotification } from "@/app/interfaces/notifications.interface";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Invalid id" });

    console.log(`id: ${id}`);
    const notifications: INotification | null = await Notification.findById(
      id
    ).lean();
    console.log(notifications);
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
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    const response = await request.json();
    console.log(response);
    if (!response)
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    if (response.estado) {
      const stateNotifications: INotification | null =
        await Notification.updateOne(
          { _id: response._id },
          { estado: response.estado }
        ).lean();
      return NextResponse.json(stateNotifications);
    }
    //* Separo los parametros para que visto sea dinamico entre vistoDriver y vistoUser
    const visto = Object.entries(response);

    const notifications: INotification | null = await Notification.updateOne(
      { _id: response._id },
      { [visto[1][0]]: visto[1][1] }
    ).lean();
    console.log(notifications);
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
