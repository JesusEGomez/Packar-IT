export const dynamic = "force-dynamic";
import { connectDB } from "@/libs/mongodb";
import Profile from "@/models/perfil";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export const dynamic = "force-dynamic";

const stripe = new Stripe(`${process.env.SK_STRIPE}`, {
  apiVersion: "2023-10-16",
});


  function getStartAndEndOfWeek() {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Establece el inicio de la semana al domingo
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Establece el fin de la semana al sábado
    return {
      startOfWeek: Math.floor(startOfWeek.getTime() / 1000), // Convertir a formato Unix Timestamp
      endOfWeek: Math.floor(endOfWeek.getTime() / 1000) // Convertir a formato Unix Timestamp
    };
  }

export async function GET(request: Request) {
    try {
      await connectDB();
  
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
      const profile = await Profile.findOne({userId: id});
      //65d350e9cebef0323aa088f9
      const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();
      const transfers = await stripe.transfers.list({
        created: {
          gte: startOfWeek, // Fecha de inicio de la semana en formato Unix Timestamp
          lte: endOfWeek // Fecha de fin de la semana en formato Unix Timestamp
        },
        destination: profile.account.number,
        expand: ['data.destination_payment']
      });
        const simplifiedTransfers:any = transfers.data.map(transfer => {
          if (typeof transfer.destination_payment === 'object' && transfer.destination_payment !== null) {
              return {
                  amount: transfer.amount,
                  application_fee_amount: transfer.destination_payment.application_fee_amount || 0 // Si no existe, se asigna un valor predeterminado (en este caso, 0)
              };
          } else {
              return {
                  amount: transfer.amount,
                  application_fee_amount: 0 // Si no existe el objeto destination_payment, se asigna un valor predeterminado (en este caso, 0)
              };
          }
      });
              
      return NextResponse.json(simplifiedTransfers, { status: 200 });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });

    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
