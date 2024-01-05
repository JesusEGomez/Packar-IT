// controllers/user.ts
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import Profile from "@/models/perfil";
import { use } from "react";

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

    const user = await User.findOne({ email: userId });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(fullUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al obtener el usuario" },
      { status: 500 }
    );
  }
}
