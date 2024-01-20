// controllers/envio.js
import { NextResponse } from "next/server";
import Envio from "@/models/envios";
import User from "@/models/user"; // Cambiando la importación
import { connectDB } from "@/libs/mongodb";
import Producto from "@/models/productos";
import Viaje from "@/models/viajes";

/**
 * Crea un nuevo recurso utilizando el método POST HTTP.
 *
 * @param {Request} request - El objeto de solicitud que contiene los datos para crear el recurso.
 * @return {Promise<NextResponse>} El objeto de respuesta que contiene el recurso creado o un mensaje de error.
 */

export async function POST(request: Request) {
  await connectDB();
  try {
    const response = await request.json();
    console.log("aca", response);
    
    const nuevoProducto = new Producto(response.producto);
    await nuevoProducto.save();

    const envio = new Envio({
      usuario: response.usuario,
      desde: response.desde,
      hasta: response.hasta,
      cuando: response.cuando,
      producto: response.producto,
      recibe: response.recibe,
    });
    const savedEnvio = await envio.save();

    console.log(savedEnvio);
    return NextResponse.json(savedEnvio);
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
    const envios = await Envio.find().populate("usuario", "email fullname");
    return NextResponse.json(envios);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener los envíos" });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { id, data } = await request.json();

    if (!id || !data) {
      return NextResponse.json(
        { message: "Se requiere el ID y los datos para la actualización" },
        { status: 400 }
      );
    }

    const updatedEnvio = await Envio.findByIdAndUpdate(id, data, { new: true });

    if (!updatedEnvio) {
      return NextResponse.json(
        { message: "Envío no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEnvio);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error en la actualización del envío" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Se requiere el ID para la eliminación" },
        { status: 400 }
      );
    }

    const deletedEnvio = await Envio.findByIdAndDelete(id);

    if (!deletedEnvio) {
      return NextResponse.json(
        { message: "Envío no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Envío eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error en la eliminación del envío" },
      { status: 500 }
    );
  }
}
