import { connectDB } from "@/libs/mongodb";
import Profile from "@/models/perfil";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.SK_STRIPE}`, {
    apiVersion: '2023-10-16',
  });

export async function GET(request: Request) {
    try {
      await connectDB();
  
      const { token, userId } = await request.json();    
  
      // if (!token) {
      //   return NextResponse.json({ message: 'Token no válido' }, { status: 400 });
      // }
  
      const user = await Profile.find({userId: userId._id});
      
      // Crear un cliente en Stripe
      const customer = await stripe.customers.create({
        source: token,
      });
      user[0].customerId = customer.id;
      //console.log(customer);
      
      await user[0].save();
  
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }