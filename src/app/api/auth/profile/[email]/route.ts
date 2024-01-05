import Profile from "@/models/perfil";
import { NextRequest } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  const { email } = params.params;
  console.log(email);
  // try {
  //   const profiles = await Profile.find().populate({
  //     path: "userId",
  //     select: "email fullname",
  //   }).populate("driverLicense").populate("idDocument");
  //   const profilesWithUserDetails = profiles.map(profile => {
  //     return {
  //       _id: profile._id,
  //       userId: {
  //         _id: profile.userId?._id || null,
  //         email: profile.userId?.email || "CorreoNoDefinido",
  //         fullname: profile.userId?.fullname || "NombreNoDefinido",
  //       },
  //       driverLicense: {
  //         frontPhoto: profile.driverLicense?.frontPhoto || "",
  //         backPhoto: profile.driverLicense?.backPhoto || "",
  //       },
  //       idDocument: {
  //         type: profile.idDocument?.type || "",
  //         number: profile.idDocument?.number || "",
  //         frontPhoto: profile.idDocument?.frontPhoto || "",
  //         backPhoto: profile.idDocument?.backPhoto || "",
  //       },
  //       city: profile.city || "",
  //       phoneNumber: profile.phoneNumber || "",
  //       __v: profile.__v || 0,
  //     };
  //   });
  //   return NextResponse.json(profilesWithUserDetails);
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json(
  //     { message: "Error al obtener los perfiles" },
  //     { status: 500 }
  //   );
  // }
}
