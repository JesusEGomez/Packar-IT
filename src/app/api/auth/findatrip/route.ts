import { connectDB } from "@/libs/mongodb";
import Profile from "@/models/perfil";
import Viaje from "@/models/viajes";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // try {
    //     await connectDB();
    //     const { searchParams } = new URL(request.url);
    //     const cityOrigin = searchParams.get('cityOrigin');
    //     const cityFinal = searchParams.get('cityFinal');

    //     // Filter trips based on the specified criteria
    //     const viajes = await Viaje.find({
    //         estado: false
    //     });
    //     const filter1Viajes = viajes.filter((viaje) => viaje.desde.ciudad === cityOrigin);
    //     const filter2 = filter1Viajes.filter((viaje :any) => viaje.hasta.ciudad === cityFinal);
        
    //     return NextResponse.json(filter2);
    // } catch (error) {
    //     console.error(error);
    //     return NextResponse.json({ message: "Error al obtener los viajes" });
    // }
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const cityOrigin = searchParams.get('cityOrigin');
        const cityFinal = searchParams.get('cityFinal');

        // Filtra los viajes basándose en los criterios especificados
        const viajes = await Viaje.find({
            estado: false
        });

        // Filtra por ciudad de origen y ciudad final
        const filter1Viajes = viajes.filter((viaje) => viaje.desde.ciudad === cityOrigin);
        const filter2Viajes = filter1Viajes.filter((viaje) => viaje.hasta.ciudad === cityFinal);

        // Mapea los viajes para agregar la información del perfil del usuario
        const viajesConPerfil = await Promise.all(filter2Viajes.map(async (viaje) => {
            const perfil = await Profile.findOne({ userId: viaje.usuario });
            return {
                ...viaje.toObject(),
                perfil: perfil.toObject() // Agrega la información del perfil al objeto del viaje
            };
        }));

        return NextResponse.json(viajesConPerfil);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error al obtener los viajes" });
    }
}