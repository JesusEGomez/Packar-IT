// models/profile.js
import { NextResponse } from "next/server";
import Profile from "@/models/perfil";
import { connectDB } from "@/libs/mongodb";

export async function POST(request: Request) {
  await connectDB();
  const {
    userId,
    driverLicense,
    idDocument,
    city,
    phoneNumber,
  } = await request.json();
  console.log(userId, driverLicense, idDocument, city, phoneNumber);

  if (!userId || !driverLicense || !idDocument || !city || !phoneNumber) {
    return NextResponse.json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const profileFound = await Profile.findOne({ userId });

    if (profileFound) {
      return NextResponse.json(
        { message: "El perfil ya existe" },
        { status: 400 }
      );
    }

    const profile = new Profile({
      userId,
      driverLicense,
      idDocument,
      city,
      phoneNumber,
    });

    const saveProfile = await profile.save();

    console.log(saveProfile);

    return NextResponse.json(saveProfile);
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

export async function GET(request: Request) {
  try {
    const profiles = await Profile.find();
    return NextResponse.json(profiles);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al obtener los perfiles" },
      { status: 500 }
    );
  }
}
