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
  prod: any;
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
    precio,
    envios,
    special,
  } = await request.json();

  // if (
  //   !userId ||
  //   !desde ||
  //   !hasta ||
  //   !cuando ||
  //   !horaSalida ||
  //   !horaLlegada ||
  //   !precio ||
  //   !envios ||
  //   !special
  // ) {
  //   const missingFields = [];

  //   if (!userId) missingFields.push("userId");
  //   if (!desde) missingFields.push("desde");
  //   if (!hasta) missingFields.push("hasta");
  //   if (!cuando) missingFields.push("cuando");
  //   if (!horaSalida) missingFields.push("horaSalida");
  //   if (!horaLlegada) missingFields.push("horaLlegada");
  //   if (!precio) missingFields.push("precio");
  //   if (!envios) missingFields.push("envios");

  //   return NextResponse.json(
  //     { error: `Faltan campos obligatorios${missingFields.join(", ")}` },
  //     { status: 400 }
  //   );
  // }

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
      estado: 'pendiente',
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
    const { viajeId, data, prod } = await request.json();

    const viajeActualizado = await Viaje.findByIdAndUpdate(
      viajeId,
      { $push: { envios: { productos: data.producto } } },
      { new: true }
    );

    if (viajeActualizado) {
      // Actualizar los precios según la lógica deseada
      switch (prod.size) {
        case "Pequeño":
          viajeActualizado.precio[0].quantity -= 1;
          break;
        case "Mediano":
          viajeActualizado.precio[1].quantity -= 1;
          break;
        case "Grande":
          viajeActualizado.precio[2].quantity -= 1;
          break;
        default:
          console.log("prodSpecial");
      }

      // Guardar los cambios en la base de datos
      await viajeActualizado.save();

      console.log(viajeActualizado);

      // Devolver la respuesta con el viaje actualizado
      return NextResponse.json(viajeActualizado);
    } else {
      return NextResponse.json({ message: "Error: Viaje no encontrado." });
    }
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
