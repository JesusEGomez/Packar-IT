import { connectDB } from "@/libs/mongodb";
import Envio from "@/models/envios";
import Producto from "@/models/productos";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
      await connectDB();
      const { searchParams } = new URL(request.url);
      const id= searchParams.get("id");
      const envio = await Envio.findOne({ _id: id });
      const prod = await Producto.findOne({_id: envio.producto});
      envio.producto = prod;
      return NextResponse.json(envio);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error al obtener los envíos" });
    }
  }