
import Stripe from "stripe";
import { NextResponse } from "next/server";



const stripe = new Stripe(process.env.STRIP_KEY_SECRET as string)


const mockEnvio = {
  userId: 'usuarioId',
  desde: 'Direccion A',
  hasta: 'Direccion B',
  cuando: '2024-01-01',
  horaSalida: '10:00',
  horaLlegada: '12:00',
  eresFlexible: true,
  estado: 'En tránsito',
  precio: 50.0,
  envios: ['Articulo 1', 'Articulo 2'],
};

export async function POST (request: Request) {
  try {
    const { userId, desde, hasta, cuando, horaSalida, horaLlegada, eresFlexible, estado, precio, envios } = mockEnvio;

    

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(precio),
      currency: 'EUR',
      description: 'Pago por envío',
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      message: 'Pago creado correctamente',
      paymentIntent,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse('Something went wrong', { status: 400 });
  }
}

export async function OPTIONS() {
  
  return new NextResponse('', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}






























// import type { NextApiRequest, NextApiResponse } from "next";

// import getRawBody from "raw-body";
// import { Webhook } from "lucide-react";


// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string , 
//     { apiVersion: '2023-10-16' });
// const endpointSecret = process.env.WEBHOOK_SECRET as string

// export const config ={
//     api:{
//         bodyParser: false,
//     }
// }

// export default async function halder(
//     req: NextApiRequest,
//     res: NextApiResponse,
//     ) {
//         try{
//             console.log("req.headers", req.headers)
//             if (req.method ! == "POST")
//             return res.status(405).send("only post")
//          const sig: any = req.headers ["stripe-signature"];
//          const rawBody= await getRawBody(req);

//          let event;
//          try{
//             event= stripe.webhooks.constructEvent(rawBody, sig, endpointSecret)
//          } catch (err:any){
//             return res.status(400).send (`Webhook error:${err.message}`)
//          }
//          console.log("event.type", JSON.stringify(event.type));
//          if (event.type=== "checkout.session.completed"){
//             const session = await stripe.checkout.sessions.retrieve(
//             (event.data.object as any).id,
//             {
                
//                 expand:["line_items"]
//             })
//             const lineItems= session.line_items;
//             if(!lineItems) return res.status(500).send("Error Interno del Servidor")
//             try{
//             console.log("cumplir el pedido con lógica personalizada");
//             console.log("data", lineItems.data);
//             console.log(
//                 "customer email",
//                 (event.data.object as any).customer_details.email
//             )
//             console.log("created",(event.data.object as any).created)
//             }catch(error){
//                 console.log("manejo cuando no puedes guardar un pedido")
//             }
//          }
//          res.status(200).end();

//         } 
//         catch(error){
//             console.log(error)
//             res.status(500).json("Error Interno del Servidor");
//         }
    
// }