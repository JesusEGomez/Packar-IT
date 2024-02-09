import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongodb';
import { Stripe } from 'stripe';
import Profile from '@/models/perfil';
import { log } from 'console';

const stripe = new Stripe(`${process.env.SK_STRIPE}`, {
    apiVersion: '2023-10-16',
  });

export async function POST(req : Request) {
    try {
        await connectDB();
        const { userId, total } = await req.json();
        console.log(userId, 'soy el userId', total)             
        const user = await Profile.find({ userId: userId });
        
        const customerId = user[0].customerId;
        const customer = await stripe.customers.retrieve(customerId) as any;
        const paymentMethodId = customer.default_source;
        // Crear un PaymentIntent para realizar el pago
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100, 
            currency: 'eur',  // La moneda del pago
            payment_method: paymentMethodId,
            customer: customerId,
            confirm: true,
            return_url: 'http://localhost:3000/respuestapago'
        });
        return NextResponse.json({ user, paymentIntent }, { status: 200 });
    } catch (error) {
        console.error('Error en la función POST:', error);
    
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
    
}