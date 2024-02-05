export const dynamic = "force-dynamic";
import { ITravelDB } from "@/app/interfaces/TravelDB.interface";

import { connectDB } from "@/libs/mongodb";
import Envio from "@/models/envios";
import Viaje from "@/models/viajes";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log(id);
    const user: ITravelDB | null = await Viaje.findById(id).lean();
    console.log(user);
    if (user) {
      for (let product of user.envios) {
        const response = await Envio.findOne({
          producto: product.productos._id,
        }).lean();
        const finalTravel = { ...product.productos, EnvioInfo: response };
        product.productos = finalTravel;
        console.log({ ...product.productos, EnvioInfo: response });
      }
    }
    return NextResponse.json(user);
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
export async function PATCH(request: Request) {
  try {
    await connectDB();

    const response: { _id: string; estado: string } = await request.json();
    console.log(response);
    if (!response) return NextResponse.json({ message: "Faltan datos" });

    const envio = await Viaje.updateOne(
      { _id: response._id },
      { estado: response.estado }
    );

    console.log(envio);
    return NextResponse.json(envio, { status: 200 });
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
