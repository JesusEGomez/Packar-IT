
import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongodb';
import { Stripe } from 'stripe';

const stripe = new Stripe(`${process.env.PK_STRIPE}`, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    await connectDB();

    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ message: 'Token no válido' }, { status: 400 });
    }

    // Aquí deberías realizar la lógica para asociar el token con el usuario en tu base de datos
    // y realizar las operaciones necesarias con Stripe

    // Ejemplo: Crear un cliente en Stripe
    const customer = await stripe.customers.create({
      source: token,
    });

    // Puedes guardar el ID del cliente en tu base de datos junto con el perfil del usuario
    // y realizar otras operaciones según tus necesidades

    return NextResponse.json({ success: true, customerId: customer.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
