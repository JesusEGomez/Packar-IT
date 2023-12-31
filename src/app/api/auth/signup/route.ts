import { NextResponse } from "next/server"
import User from "@/models/user"
import { connectDB } from "@/libs/mongodb"
import bcrypt from "bcrypt"


export async function POST(request: Request) {
    await connectDB();
    const { fullname, email, password } = await request.json();
    console.log(fullname, email, password);

    if (!fullname || !email || !password) {
        return NextResponse.json({ message: "Todos los campos son obligatorios" });
    }

    if (password.length < 6) {
        return NextResponse.json({ message: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 });
    }
    try {
        await connectDB();
        const userFound = await User.findOne({ email });

        if (userFound) {
            return NextResponse.json({ message: "El usuario ya existe" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ fullname, email, password: hashedPassword });
        const saveUser = await user.save();

        console.log(saveUser);

        return NextResponse.json(saveUser);
    } catch (error) {

        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}



export async function GET(request: Request) {
  try {
    const users = await User.find(); 
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener los usuarios" }, { status: 500 });
  }
}