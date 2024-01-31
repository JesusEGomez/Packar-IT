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
    const user: ITravelDB | null = await Viaje.findOne({
      _id: id,
    }).lean();
    console.log(user);
    if (user) {
      for (let product of user.envios) {
        const response = await Envio.findOne({
          producto: product.productos[0]._id,
        }).lean();
        const finalTravel = { ...product.productos[0], EnvioInfo: response };
        product.productos[0] = finalTravel;
        console.log({ ...product.productos[0], EnvioInfo: response });
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
