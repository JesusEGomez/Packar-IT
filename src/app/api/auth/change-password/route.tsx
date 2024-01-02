import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectDB } from "@/libs/mongodb";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import bcrypt from "bcryptjs";

interface BodyProps {
  newPassword: string;
  confirmPassword: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: BodyProps = await request.json();
    const { newPassword, confirmPassword } = body;
    
    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: "Please enter your new password and confirm password" },
        { status: 400 }
      );
    }

    await connectDB();
    const headersList = headers();
    const token = headersList.get('token');
    
    if (!token) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 400 }
      );
    }

    console.log('Token:', token);

    try {
      const isTokenValido = jwt.verify(token, "secreto");
      //@ts-ignore
      const { data } = isTokenValido;
      console.log('Contenido del Token:', jwt.decode(token));
      
      const userFind = await User.findById(data.userId);
      
      if (!userFind) {
        return NextResponse.json(
          { message: "Usuario no encontrado" },
          { status: 400 }
        );
      }

      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          { message: "Las contraseñas no coinciden" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      userFind.password = hashedPassword;
      await userFind.save();

      return NextResponse.json({ message: "Contraseña cambiada correctamente" }, { status: 200 });

    } catch (error) {
      console.error('Error al verificar el token:', error);
      return NextResponse.json({ message: "Token invalido" }, { status: 400 });
    }

  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    return NextResponse.json({ message: "Error al cambiar la contraseña" }, { status: 500 });
  }
}
