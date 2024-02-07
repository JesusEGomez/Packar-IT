import { NextResponse } from "next/server";
import Profile from "@/models/perfil";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";

export async function PUT(request: Request) {
  await connectDB();
  const { userId, email, driverLicense, idDocument, city, phoneNumber, notifications, routes } =
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
        notifications,
        routes, // Agrega las rutas al perfil
      });

      await profile.save();
    } else {
      // Si existe, actualiza los campos individualmente
      if (driverLicense) profile.driverLicense = driverLicense;
      if (idDocument) profile.idDocument = idDocument;
      if (city) profile.city = city;
      if (phoneNumber) profile.phoneNumber = phoneNumber;
      if (notifications) profile.notifications = notifications;
      if (routes) profile.routes = routes; // Actualiza las rutas

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
