// controllers/envio.js
import { NextResponse } from "next/server";
import Envio from "@/models/envios";
import User from "@/models/user";  // Cambiando la importación
import { connectDB } from "@/libs/mongodb";
import Producto from "@/models/productos";
import Viaje from "@/models/viajes"

export async function POST(request: Request) {
    await connectDB();
    const { userId, desde, hasta, cuando, producto } = await request.json();

    if (!userId || !desde || !hasta || !cuando || !producto) {
        return NextResponse.json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
        }

        const nuevoProducto = new Producto(producto);
        const savedProducto = await nuevoProducto.save();

        const envio = new Envio({ usuario: userId, desde, hasta, cuando, producto });
        const savedEnvio = await envio.save();

        console.log(savedEnvio);

        // Guardar la información del envío en la base de datos de viajes
        const nuevoViaje = new Viaje({
            usuario: userId,
            desde,
            hasta,
            cuando,
            horaSalida: new Date(), // Puedes ajustar esto según tus necesidades
            horaLlegada: new Date(), // Puedes ajustar esto según tus necesidades
            eresFlexible: false, // Puedes ajustar esto según tus necesidades
            estado: true, // Puedes ajustar esto según tus necesidades
            precio: 0, // Puedes ajustar esto según tus necesidades
        });

        const savedViaje = await nuevoViaje.save();
        console.log(savedViaje);

        return NextResponse.json(savedEnvio);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
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
            return NextResponse.json({ message: "Se requiere el ID y los datos para la actualización" }, { status: 400 });
        }

        const updatedEnvio = await Envio.findByIdAndUpdate(id, data, { new: true });

        if (!updatedEnvio) {
            return NextResponse.json({ message: "Envío no encontrado" }, { status: 404 });
        }

        return NextResponse.json(updatedEnvio);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error en la actualización del envío" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ message: "Se requiere el ID para la eliminación" }, { status: 400 });
        }

        const deletedEnvio = await Envio.findByIdAndDelete(id);

        if (!deletedEnvio) {
            return NextResponse.json({ message: "Envío no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Envío eliminado correctamente" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error en la eliminación del envío" }, { status: 500 });
    }
}