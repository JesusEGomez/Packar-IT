import { connectDB } from "@/libs/mongodb";
import Profile from "@/models/perfil";
import User from "@/models/user"; // Import the User model
import Viaje from "@/models/viajes";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const cityOrigin = searchParams.get('cityOrigin');
        const cityFinal = searchParams.get('cityFinal');

        // Filtra los viajes basándose en los criterios especificados
        let viajes = [];
        viajes = await Viaje.find({
            estado: false
        });

        // Filtra por ciudad de origen y ciudad final
        if(viajes){
            const filter1Viajes = viajes.filter((viaje) => viaje.desde.ciudad === cityOrigin);
            const filter2Viajes = filter1Viajes.filter((viaje) => viaje.hasta.ciudad === cityFinal);
        
        // Mapea los viajes para agregar la información del usuario
            const viajesConUsuario = await Promise.all(filter2Viajes.map(async (viaje) => {
            const usuario = await User.findById(viaje.usuario);
            return {
                ...viaje.toObject(),
                usuario: usuario.toObject() // Agrega la información del usuario al objeto del viaje
                };
             }));

            return NextResponse.json(viajesConUsuario);
        }
        return NextResponse.json('no hay viajes con tus caracteristicas')
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error al obtener los viajes" });
    }
}
