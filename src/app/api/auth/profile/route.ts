// models/profile.js
import { NextResponse } from "next/server";
import Profile from "@/models/perfil";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";

export async function PUT(request: Request) {
  await connectDB();
  const { userId, email, driverLicense, idDocument, city, phoneNumber } =
    await request.json();

  if (!userId) {
    return NextResponse.json({ message: "Id requerido" });
  }

  try {
    // Obtén el email del usuario utilizando la referencia al modelo de usuario
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const userEmail = user.email || "CorreoNoDefinido";

    // Actualiza el perfil con la información proporcionada
    let profile = await Profile.findOne({ userId });

    if (!profile) {
      // Si no existe, crea un nuevo perfil
      profile = new Profile({
        userId,
        email: userEmail,
        driverLicense,
        idDocument,
        city,
        phoneNumber,
      });

      await profile.save();
    } else {
      // Si existe, actualiza los campos individualmente
      profile.userId = userId;
      profile.email = userEmail;
      profile.driverLicense = driverLicense;
      profile.idDocument = idDocument;
      profile.city = city;
      profile.phoneNumber = phoneNumber;

      await profile.save();
    }

    // Obtén el perfil actualizado con los detalles del usuario
    profile = await Profile.findById(profile._id).populate(
      "userId",
      "fullname email"
    );
    console.log(profile);
    return NextResponse.json({ profile, userId });
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
    const profiles = await Profile.find()
      .populate({
        path: "userId",
        select: "email fullname",
      })
      .populate("driverLicense")
      .populate("idDocument");

    const profilesWithUserDetails = profiles.map((profile) => {
      return {
        _id: profile._id,
        userId: {
          _id: profile.userId?._id || null,
          email: profile.userId?.email || "CorreoNoDefinido",
          fullname: profile.userId?.fullname || "NombreNoDefinido",
        },
        driverLicense: {
          frontPhoto: profile.driverLicense?.frontPhoto || "",
          backPhoto: profile.driverLicense?.backPhoto || "",
        },
        idDocument: {
          type: profile.idDocument?.type || "",
          number: profile.idDocument?.number || "",
          frontPhoto: profile.idDocument?.frontPhoto || "",
          backPhoto: profile.idDocument?.backPhoto || "",
        },
        city: profile.city || "",
        phoneNumber: profile.phoneNumber || "",
        __v: profile.__v || 0,
      };
    });

    return NextResponse.json(profilesWithUserDetails);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al obtener los perfiles" },
      { status: 500 }
    );
  }
}
