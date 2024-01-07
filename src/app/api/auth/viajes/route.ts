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

    const { userId, desde, hasta, cuando, horaSalida, horaLlegada, eresFlexible, estado, precio , productos} = await request.json();

    console.log(userId, desde, hasta, cuando, horaSalida, horaLlegada, eresFlexible, estado, precio, productos)

    if (!userId || !desde || !hasta || !cuando || !horaSalida || !horaLlegada || !precio || !productos) {
        const missingFields = [];

        if (!userId) missingFields.push("userId");
        if (!desde) missingFields.push("desde");
        if (!hasta) missingFields.push("hasta");
        if (!cuando) missingFields.push("cuando");
        if (!horaSalida) missingFields.push("horaSalida");
        if (!horaLlegada) missingFields.push("horaLlegada");
        if (!precio) missingFields.push("precio");
        if (!productos) missingFields.push("productos");

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

    if (!desde.coordenadasExtras && !hasta.coordenadasExtras) {
        const missingFields = [];
        if (!desde.coordenadasExtras) missingFields.push("coordenadasExtras");
        if (!hasta.coordenadasExtras) missingFields.push("coordenadasExtras");
        return NextResponse.json({
            message: `Faltan campos opcionales: ${missingFields.join(", ")}`,
        });
    }


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
            productos,
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
