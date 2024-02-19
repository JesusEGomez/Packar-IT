export const dynamic = "force-dynamic";
import { connectDB } from "@/libs/mongodb";
import Profile from "@/models/perfil";
import { NextResponse } from "next/server";

interface UpdatedFields {
  phoneNumber?: string;
  city?: string;
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log(id);
    const user = await Profile.findOne({
      userId: {
        _id: id,
      },
    });
    //console.log(user);
    return NextResponse.json(user);
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

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const requestData = (await request.json()) as {
      phoneNumber?: string;
      city?: string;
    };

    // Extraer los campos phoneNumber y city del objeto requestData
    const phoneNumber = requestData.phoneNumber;
    const city = requestData.city;

    // Crear un objeto que contenga solo los campos phoneNumber y city que se desean actualizar
    const updatedFields: UpdatedFields = {
      phoneNumber: phoneNumber || undefined,
      city: city || undefined,
    };

    // Si phoneNumber está presente en la solicitud, agregarlo a los campos a actualizar
    if (phoneNumber !== undefined) {
      updatedFields.phoneNumber = phoneNumber;
    }

    // Si city está presente en la solicitud, agregarlo a los campos a actualizar
    if (city !== undefined) {
      updatedFields.city = city;
    }

    // Actualizar el perfil solo si hay campos para actualizar
    if (Object.keys(updatedFields).length > 0) {
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId: id },
        { $set: updatedFields },
        { new: true }
      );

      return NextResponse.json(updatedProfile);
    } else {
      // Si no hay campos para actualizar, devolver un mensaje indicando que no se han proporcionado datos para la actualización
      return NextResponse.json(
        { message: "No data provided for update" },
        { status: 400 }
      );
    }
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
