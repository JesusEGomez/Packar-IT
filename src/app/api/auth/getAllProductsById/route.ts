import { connectDB } from "@/libs/mongodb";
import Envio from "@/models/envios";
import Viaje from "@/models/viajes";
import { strict } from "assert";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log(id);
    const envios = await Envio.find({
      usuario: id,
    });
    // const finalEnvios = [];

    envios.forEach((envio) => {
      console.log(envio?.estado);
      // const user = await Viaje.findById(envio.driver,);
      // finalEnvios.push({ ...envio, userDriver: user });
    });

    // console.log(finalEnvios);

    console.log(envios);
    return NextResponse.json(envios);
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
