'use client'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AuxMonedero from "./AuxMonedero";

const Monedero = (props:any) => {
    const stripePromise = loadStripe(`${process.env.PK_STRIPE}`);
    
    return(
        <div className="flex flex-col p-2">
            <div onClick={props.closeModal}><IoMdArrowRoundBack size={30} /></div>
            
                {/* aqui pregunto si existe una tarjeta añadida, si existe muestro este div */}
                <div>
                    <div className='border-b mb-4' >
                        aqui va la card actual
                    </div>
                    <button
                    className='bg-pink w-full disabled:opacity-70 m-2 text-white font-bold rounded-xl p-3'
                  >
                    Datos del Receptor
                  </button>
                </div>
            
                {/* si no existe muestro este div */}
                <div>
                    <h1 className="text-2xl font-bold mt-4 mb-10">Monedero</h1>
                    <p className='text-slate-400 text-sm mb-5'>Añade un método de pago para realizar tus envíos y recibir el dinero de tus trayectos.</p>
                    <div>
                        <Elements stripe={stripePromise}>
                            <AuxMonedero />
                        </Elements>
                    </div>
                    <button>Añadir tarjeta</button>
                </div>
            
        </div>
    )
}

export default Monedero;

