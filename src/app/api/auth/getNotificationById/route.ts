import { connectDB } from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Notification from "@/models/notifications";
import { INotification } from "@/app/interfaces/notifications.interface";
import { IProductEnvio } from "@/app/interfaces/productDB.interface";

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
      return NextResponse.json({ error: "missing data" }, { status: 400 });

    if (response.estado) {
      const stateNotifications: INotification | null =
        await Notification.updateOne(
          { _id: response._id },
          { estado: response.estado }
        ).lean();
      return NextResponse.json(stateNotifications);
    }
    //* Separo el objeto asi obtengo la key y el value para que visto sea dinamico entre vistoDriver y vistoUser
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
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const response = await request.json();
    console.log(response);
    if (!response)
      return NextResponse.json({ error: "missing data" }, { status: 400 });

    const notifications: INotification | null = await Notification.findOne({
      "producto._id": response.producto,
    }).lean();
    const filter = { _id: notifications?._id };

    let update = {
      $set: {
        subestado: "cambios",
        estadoEnvio: response.estado,
        vistoUser: false,
        vistoDriver: true,
        type: "solicitudServicio",
      },
    };

    if (response.estado === "Finalizado") {
      update = {
        $set: {
          subestado: "cambios",
          estadoEnvio: response.estado,
          vistoUser: true,
          vistoDriver: false,
          type: "respuestaServicio",
        },
      };
    }
    console.log(update);
    const options = { new: true };

    const notificationUpdated = await Notification.findByIdAndUpdate(
      filter,
      update,
      options
    ).lean();
    if (!notificationUpdated)
      return NextResponse.json(
        { error: "document not found" },
        { status: 400 }
      );
    if (notificationUpdated)
      return NextResponse.json(notificationUpdated, { status: 200 });
    console.log(notificationUpdated);
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
