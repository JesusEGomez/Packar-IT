export const dynamic = "force-dynamic";
import { IUser } from "@/app/interfaces/user.interface";
import Viajes from "@/app/loged/misenvios/viajes/page";
import { connectDB } from "@/libs/mongodb";
import Profile from "@/models/perfil";
import User from "@/models/user"; // Import the User model
import Viaje from "@/models/viajes";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const cityOrigin = searchParams.get("cityOrigin");
    const cityFinal = searchParams.get("cityFinal");
    console.log("city:" + cityOrigin, "cityFinal:" + cityFinal);
    // Filtra los viajes basándose en los criterios especificados
    const viajes = await Viaje.find({
      estado: "pendiente",
    })
      .populate("usuario")
      .lean();
    console.log(viajes);
    // Filtra por ciudad de origen y ciudad final

    const filter1Viajes = viajes.filter(
      (viaje) =>
        viaje.desde.ciudad === cityOrigin && viaje.hasta.ciudad === cityFinal
    );
    // const filter2Viajes = filter1Viajes.filter(
    //   (viaje) => viaje.hasta.ciudad === cityFinal
    // );

    // Mapea los viajes para agregar la información del usuario
    // const viajesConUsuario = await Promise.all(
    //   filter2Viajes.map(async (viaje) => {
    //     const usuario: IUser | null = await User.findById(viaje.usuario).lean();

    //     if (usuario) {
    //       return {
    //         ...viaje,
    //         usuario: usuario, // Agrega la información del usuario al objeto del viaje
    //       };
    //     }
    //   })
    // );
    return NextResponse.json(filter1Viajes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener los viajes" });
  }
}
