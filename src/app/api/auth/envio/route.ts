import { NextResponse } from "next/server";
import Envio from "@/models/envios";  // Cambiando la importación
import { connectDB } from "@/libs/mongodb";

export async function POST(request: Request) {
    await connectDB();
    const { desde, hasta, cuando, producto } = await request.json();

    if (!desde || !hasta || !cuando || !producto) {
        return NextResponse.json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const envio = new Envio({ desde, hasta, cuando, producto });  
        const savedEnvio = await envio.save();  

        console.log(savedEnvio);

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
        const envios = await Envio.find();  
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