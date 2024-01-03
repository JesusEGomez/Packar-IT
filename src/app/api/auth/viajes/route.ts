// Importa el modelo Viaje
import Viaje from "@/models/viajes";
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";

export async function POST(request: Request) {
    await connectDB();
    const { desde, hasta, cuando, horaSalida, horaLlegada, eresFlexible, tamañoParaTrasnsportar, pesoParaTrasnsportar, articulosEspeciales, precio } = await request.json();

    if (!desde || !hasta || !cuando || !horaSalida || !horaLlegada || !eresFlexible || !tamañoParaTrasnsportar || !pesoParaTrasnsportar || !precio) {
        return NextResponse.json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const viaje = new Viaje({ desde, hasta, cuando, horaSalida, horaLlegada, eresFlexible, tamañoParaTrasnsportar, pesoParaTrasnsportar, articulosEspeciales, precio });
        const savedViaje = await viaje.save();

        console.log(savedViaje);

        return NextResponse.json(savedViaje);
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
        const viajes = await Viaje.find();
        return NextResponse.json(viajes);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error al obtener los viajes" });
    }
}
