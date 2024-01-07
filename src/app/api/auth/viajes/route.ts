// Importa el modelo Viaje
import Viaje from "@/models/viajes";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";

interface RequestWithJson extends Request {
    json(): Promise<any>;
}

export async function POST(request: RequestWithJson) {
    await connectDB();

    const { userId, desde, hasta, cuando, horaSalida, horaLlegada, eresFlexible, estado, precio } = await request.json();
    const requiredFields = ['userId', 'desde', 'hasta', 'cuando', 'horaSalida', 'horaLlegada', 'precio'];

    const missingFields = requiredFields.filter(field => !eval(field));
    if (missingFields.length > 0) {
        return NextResponse.json({
            message: `Faltan campos obligatorios: ${missingFields.join(", ")}`,
        });
    }

    const validateLocation = (location) => {
        const requiredLocationFields = ['pais', 'ciudad', 'latitud', 'longitud'];
        return requiredLocationFields.every(field => location[field]);
    };

    if (!validateLocation(desde) || !validateLocation(hasta)) {
        return NextResponse.json({ message: "Campos obligatorios dentro de 'desde' o 'hasta' no proporcionados" });
    }

    if (!desde.coordenadasExtras && !hasta.coordenadasExtras) {
        return NextResponse.json({
            message: `Faltan campos opcionales: coordenadasExtras`,
        });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
        }

        const viajeData = {
            usuario: userId,
            desde,
            hasta,
            cuando,
            horaSalida,
            horaLlegada,
            eresFlexible: eresFlexible || false,
            estado: estado || false,
            precio,
        };

        const nuevoViaje = new Viaje(viajeData);
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


