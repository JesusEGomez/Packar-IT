import { NextResponse } from 'next/server';
import { connectDB } from '@/libs/mongodb';
import { Stripe } from 'stripe';
import Profile from '@/models/perfil';
import Envio from '@/models/envios';

const stripe = new Stripe(`${process.env.SK_STRIPE}`, {
    apiVersion: '2023-10-16',
  });

export async function POST(req : Request) {
    try {
        await connectDB();
        const { userId, total, driver, envio } = await req.json();            
        const user = await Profile.findOne({ userId: userId });
        const user2 = await Profile.findOne({ userId: driver });
        const dely = await Envio.findOne({ _id:envio });
        const customerId = user.customerId;
        const customer = await stripe.customers.retrieve(customerId) as any;
        const paymentMethodId = customer.default_source;

        const packarPrice = (price:number) => {
          if (price < 10) {
            return (price * 0.35).toFixed(2); // Sumar un 35%
          } else if (price >= 10 && price <= 19) {
            return (price * 0.37).toFixed(2); // Sumar un 37%
          } else if (price >= 20 && price <= 39) {
            return (price * 0.40).toFixed(2); // Sumar un 40%
          } else if (price >= 40 && price <= 59) {
            return (price * 0.45).toFixed(2); // Sumar un 45%
          } else {
            return (price * 0.35).toFixed(2); // Sumar un 35% (para precios >= 60)
          }
        }
        // Crear un PaymentIntent para realizar el pago
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100, 
            currency: 'eur',  // La moneda del pago
            payment_method: paymentMethodId,
            customer: customerId,
            confirm: true,
            return_url: 'http://localhost:3000/respuestapago',
            transfer_data: {
                destination: user2.account,
            },
            application_fee_amount: Number(packarPrice(total)) * 100
        });
        dely.payment = paymentIntent.id;
        const savedDely = await dely.save();
        
          const packarComision = packarPrice(total);

        // const paymentPackar = await stripe.paymentIntents.create({
        //     amount: Number(packarComision) * 100, 
        //     currency: 'eur',  // La moneda del pago
        //     payment_method: paymentMethodId,
        //     customer: customerId,
        //     confirm: true,
        //     return_url: 'http://localhost:3000/respuestapago',
        //     transfer_data: {
        //         destination: 'acct_1OjWSfIPT3NWX9vQ',
        //     },
        // });
        // dely.packarPayment = paymentPackar.id;
        // const saved2Dely = await dely.save();

        return NextResponse.json({ user, paymentIntent }, { status: 200 });
    } catch (error) {
        console.error('Error en la función POST:', error);
    
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
    
}