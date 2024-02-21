export const dynamic = "force-dynamic";
import { connectDB } from "@/libs/mongodb";
import Profile from "@/models/perfil";
import { NextRequest, NextResponse } from "next/server";

interface UpdatedFields {
  phoneNumber?: string;
  city?: string;
  idDocument?: {
    type?: string;
    number?: string;
    frontPhoto?: string;
    backPhoto?: string;
    isLoaded?: boolean;
  };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    const user = await Profile.findOne({
      userId: id,
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal Server Errorr" },
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
      idDocument?: {
        type?: string;
        number?: string;
        frontPhoto?: string;
        backPhoto?: string;
        isLoaded?: boolean;
      };
    };

    const phoneNumber = requestData.phoneNumber;
    const city = requestData.city;
    const idDocument = requestData.idDocument;

    const updatedFields: UpdatedFields = {
      phoneNumber: phoneNumber || undefined,
      city: city || undefined,
      idDocument: idDocument || undefined,
    };

    if (Object.keys(updatedFields).length > 0) {
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId: id },
        { $set: updatedFields },
        { new: true }
      );
      return NextResponse.json(updatedProfile);
    } else {
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
