export const dynamic = "force-dynamic";
import { connectDB } from "@/libs/mongodb";
import Envio from "@/models/envios";
import Viaje from "@/models/viajes";
import Producto from "@/models/productos";

import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request) {
  try {
    await connectDB();

    mongoose.model("Producto", Producto.schema);
    if (!mongoose.models["Producto"]) {
      console.error("El modelo Producto no está disponible.");
    } else {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
      //console.log(id);
      const finalProducts = [];

      if (!id)
        return NextResponse.json({ message: "id no valido" }, { status: 400 });

      const envios = await Envio.find({
        usuario: id,
      })
        .populate("producto")
        .lean();
      //console.log(envios);

      if (envios) {
        for (let driver of envios) {
          const driverFinded = await Viaje.findById(driver.driver).lean();

          finalProducts.push({ ...driver, findedDriver: driverFinded });
        }
      }

      //console.log();
      return NextResponse.json(finalProducts);
    }
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
