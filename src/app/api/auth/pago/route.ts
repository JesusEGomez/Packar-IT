export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongodb';
import { Stripe } from 'stripe';
import Profile from '@/models/perfil';

const stripe = new Stripe(`${process.env.SK_STRIPE}`, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    await connectDB();

    const { token, userId } = await request.json();
    console.log(userId._id);
    

    if (!token) {
      return NextResponse.json({ message: 'Token no válido' }, { status: 400 });
    }

    const user = await Profile.find({userId: userId._id});
    
    // Crear un cliente en Stripe
    const customer = await stripe.customers.create({
      source: token,
    });
    user[0].customerId = customer.id;
    console.log(customer);
    
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

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('idUser');
    console.log(userId);

    const searchUser = await Profile.findOne({userId: userId});
    
    if (!searchUser) {
      return NextResponse.json({ message: 'ID de cliente no válido' }, { status: 400 });
    }

    // Obtener información del cliente en Stripe
    const customer = await stripe.customers.retrieve(searchUser.customerId) as any;   

    // Obtener la información de la tarjeta
    const paymentMethodId = customer.default_source;
    
    if (!paymentMethodId) {
      return NextResponse.json({ message: 'No se encontró información de la tarjeta' }, { status: 404 });
    }

    // Obtener detalles del método de pago (incluyendo los últimos 4 dígitos)
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    return NextResponse.json({ paymentMethod }, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}