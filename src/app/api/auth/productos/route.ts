import { NextResponse } from "next/server";
import Producto from "@/models/productos";
import { connectDB } from "@/libs/mongodb";

export async function POST(request: Request) {
  await connectDB();
  const { types, name, size, weight } = await request.json();

  if (!types || !name || !size || !weight) {
    return NextResponse.json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const producto = new Producto({ types, name, size, weight });
    const savedProducto = await producto.save();

    console.log(savedProducto);

    return NextResponse.json(savedProducto);
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

export async function GET(request: Request) {
  try {
    await connectDB();
    const productos = await Producto.find();
    return NextResponse.json(productos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener los productos" });
  }
}
