// Importa el modelo Viaje
import Viaje from "@/models/viajes";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";

interface DesdeHasta {
  pais: string;
  ciudad: string;
  latitud: number;
  longitud: number;
}

interface ViajeRequest {
  userId: string;
  desde: DesdeHasta;
  hasta: DesdeHasta;
  cuando: string;
  horaSalida: string;
  horaLlegada: string;
  eresFlexible: boolean;
  estado: boolean;
  precio: number;
  envios: {}[];
  special: boolean;
}

interface PutRequest {
  viajeId: string;
  data: any;
}

interface RequestWithJson<T> extends Request {
  json(): Promise<T>;
}

export async function POST(request: RequestWithJson<ViajeRequest>) {
  await connectDB();

  const {
    userId,
    desde,
    hasta,
    cuando,
    horaSalida,
    horaLlegada,
    eresFlexible,
    estado,
    precio,
    envios,
    special
  } = await request.json();

  console.log(
    userId,
    desde,
    hasta,
    cuando,
    horaSalida,
    horaLlegada,
    eresFlexible,
    estado,
    precio,
    envios
  );

  if (
    !userId ||
    !desde ||
    !hasta ||
    !cuando ||
    !horaSalida ||
    !horaLlegada ||
    !precio ||
    !envios
  ) {
    const missingFields = [];

    if (!userId) missingFields.push("userId");
    if (!desde) missingFields.push("desde");
    if (!hasta) missingFields.push("hasta");
    if (!cuando) missingFields.push("cuando");
    if (!horaSalida) missingFields.push("horaSalida");
    if (!horaLlegada) missingFields.push("horaLlegada");
    if (!precio) missingFields.push("precio");
    if (!envios) missingFields.push("envios");

    return NextResponse.json(
      { error: `Faltan campos obligatorios${missingFields.join(", ")}` },
      { status: 400 }
    );
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
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
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
      special,
    });
    const savedViaje = await nuevoViaje.save();

    console.log(savedViaje);

    return NextResponse.json(savedViaje);
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

export async function PUT(request: RequestWithJson<PutRequest>) {
  try {
    await connectDB();
    const { viajeId, data } = await request.json();
    const viaje = await Viaje.findById(viajeId);
    console.log(data, 'soy el envio');
    
    viaje.envios.push(data);
    console.log(viaje);
    return NextResponse.json(viaje);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al actualizar los viajes" });
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
