export const dynamic = "force-dynamic";
import { connectDB } from "@/libs/mongodb";
import Envio from "@/models/envios";
import Profile from "@/models/perfil";
import Viaje from "@/models/viajes";
import User from "@/models/user";

import { NextResponse } from "next/server";
import { ITravelDB } from "@/app/interfaces/TravelDB.interface";
import { IUserProduct } from "@/app/interfaces/userProduct.interface";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "id no valido" }, { status: 400 });

    const envio: IUserProduct | null = await Envio.findById(id)
      .populate("producto")
      .lean();
    //console.log(envio);
    if (envio) {
      const driverFinded: ITravelDB | null = await Viaje.findById(
        envio.driver
      ).lean();
      //console.log(driverFinded);
      let userFinded = await User.findOne({
        _id: driverFinded?.usuario,
      }).lean();
      const profile = await Profile.findOne({
        userId: { _id: driverFinded?.usuario },
      }).lean();

      const finalProduct = {
        ...envio,
        driverFinded: driverFinded,
        driverProfile: profile,
        driverUser: userFinded,
      };

      return NextResponse.json(finalProduct, { status: 200 });
    }

    //console.log();
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
