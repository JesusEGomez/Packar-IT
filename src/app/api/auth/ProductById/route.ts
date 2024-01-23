export const dynamic = "force-dynamic";
import { connectDB } from "@/libs/mongodb";
import Envio from "@/models/envios";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log(id);
    const envio = await Envio.findById(id);
    // const finalEnvios = [];

    // envios.forEach((envio) => {
    // console.log(envio?.estado);
    // const user = await Viaje.findById(envio.driver,);
    // finalEnvios.push({ ...envio, userDriver: user });
    // });

    // console.log(finalEnvios);

    console.log(envio);
    return NextResponse.json(envio);
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

    const response = await request.json();
    console.log(response);
    if (!response) return NextResponse.json({ message: "Faltan datos" });

    const envio = await Envio.findByIdAndUpdate(response._id, response, {
      new: true,
    });

    //   console.log(envio);
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
