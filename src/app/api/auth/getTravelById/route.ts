export const dynamic = "force-dynamic";
import { connectDB } from "@/libs/mongodb";
import Envio from "@/models/envios";
import Viaje from "@/models/viajes";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const allProduct = [];
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log(id);
    const user = await Viaje.findOne({
      _id: id,
    });
    // console.log(user);
    if (user) {
      for (let product of user.envios) {
        const response = await Envio.findById(product._id);
        console.log(response);
        product.productos = response;
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
