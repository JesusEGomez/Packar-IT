import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import Profile from "@/models/perfil";

export async function GET(request: NextRequest, params: any) {
  try {
    await connectDB();
    console.log(params);
    const userId = params.params.id;
    console.log(userId);

    if (!userId) {
      return NextResponse.json(
        { message: "Se requiere el ID del usuario en la consulta" },
        { status: 400 }
      );
    }

    // Buscar al usuario
    const user = await User.findOne({ email: userId });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Utilizar la referencia userId para obtener el perfil asociado
    const profile = await Profile.findOne({ userId: user._id });

    // Crear un nuevo objeto con la información del usuario y el perfil
    const userWithProfile = {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      profile: profile ? { ...profile.toObject() } : null,
    };

    return NextResponse.json(userWithProfile);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al obtener el usuario" },
      { status: 500 }
    );
  }
}
