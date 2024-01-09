// Importa el modelo Viaje
import Viaje from "@/models/viajes";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";


interface RequestWithJson extends Request {
    json(): Promise<any>;
}

export async function POST(request: RequestWithJson) {
    await connectDB();

    const { userId, desde, hasta, cuando, horaSalida, horaLlegada, eresFlexible, estado, precio , envios} = await request.json();

    console.log(userId, desde, hasta, cuando, horaSalida, horaLlegada, eresFlexible, estado, precio, envios)

    if (!userId || !desde || !hasta || !cuando || !horaSalida || !horaLlegada || !precio || !envios) {
        const missingFields = [];

        if (!userId) missingFields.push("userId");
        if (!desde) missingFields.push("desde");
        if (!hasta) missingFields.push("hasta");
        if (!cuando) missingFields.push("cuando");
        if (!horaSalida) missingFields.push("horaSalida");
        if (!horaLlegada) missingFields.push("horaLlegada");
        if (!precio) missingFields.push("precio");
        if (!envios) missingFields.push("envios");

        return NextResponse.json({
            message: `Faltan campos obligatorios: ${missingFields.join(", ")}`,
        });
    }

    // Validación para campos dentro de 'desde'
   // if (!desde.pais || !desde.ciudad || !desde.latitud || !desde.longitud) {
     //   return NextResponse.json({ message: "Campos obligatorios dentro de 'desde' no proporcionados" });
   // }

   // if (!hasta.pais || !hasta.ciudad || !hasta.latitud || !hasta.longitud) {
     //   return NextResponse.json({ message: "Campos obligatorios dentro de 'hasta' no proporcionados" });
    //}

    


    try {
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
        }

        const nuevoViaje = new Viaje({
            usuario: userId,
            desde,
            hasta,
            cuando,
            horaSalida, 
            horaLlegada, 
            eresFlexible, 
            estado: false, 
            precio, 
            envios,
        });
        const savedViaje = await nuevoViaje.save();

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

export async function PUT(request: Request) {
    try {
        await connectDB();
        const { viajeId, envio } = await request.json();
        const viaje = await Viaje.findById(viajeId);
        viaje.envios.push(envio)
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error al actualizar los viajes" });
    }
}