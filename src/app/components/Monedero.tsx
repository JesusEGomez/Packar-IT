'use client'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AuxMonedero from "./AuxMonedero";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RiVisaLine } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import ModalChangeCard from "./ModalChangeCard";
import { FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcDiscover } from "react-icons/fa6";
import { FaCcDinersClub } from "react-icons/fa";
import { SiJcb } from "react-icons/si";
import { FaRegCreditCard } from "react-icons/fa";

type Card = {
    id: string;
    object: string;
    billing_details: {
      address: {
        city: null;
        country: null;
        line1: null,
        line2: null,
        postal_code: string,
        state: null
      },
      email: null,
      name: null,
      phone: null
    },
    card: {
      brand: string,
      checks: {
        address_line1_check: null,
        address_postal_code_check: string,
        cvc_check: string
      },
      country: string,
      exp_month: number,
      exp_year: number,
      fingerprint: string,
      funding: string,
      generated_from: null,
      last4: '4242',
      networks: { available: any[], preferred: null },
      three_d_secure_usage: { supported: boolean },
      wallet: null
    },
    created: number,
    customer: string;
    livemode: boolean,
    metadata: {};
    type: string;
  }
  

const Monedero = (props:any) => {
    const pkStripe = 'pk_test_51OjWQTIYUHJezeI6CcvDBG7pyFX3ZQQfn892aefrXpvupTOoGESSsp2BUXsENIR00LAVQyi3Eunk4ap27kMqAtzE00hQStEwt5';
    const {data: session} = useSession();
    const stripePromise = loadStripe(pkStripe);
    const [myCard, setMyCard] = useState<Card | null>(null);
    const [loadFetch, setLoadFetch] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);
    const closeModal = () => {
        setModalOpen(false);
    }

    const closeWithChange = async () => {
        setMyCard(null);
        await fetch(`/api/auth/pago/?idUser=${userId}`,{
            headers: {
                "Content-Type": "application/json",
              },
              method: 'PUT',
        })
        setModalOpen(false);
    }

    const changeLoad = () => {
        setLoadFetch(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            const userInfo = await fetch(`/api/auth/myid/?email=${session?.user?.email}`, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
            const user = await userInfo.json();
            setUserId(user._id)
            const getCardInfo = await fetch(`/api/auth/pago/?idUser=${user._id}`,{
                headers: {
                    "Content-Type": "application/json",
                  },
            });
            if(loadFetch){
                if(getCardInfo.ok){
                    const card = await getCardInfo.json();
                    setMyCard(card.paymentMethod);
                    //console.log(card.paymentMethod);
                    
                    setLoadFetch(false);
                }
            }
            
        }
        fetchData();
    },[loadFetch])

    return(
        <div className="flex flex-col items-center p-2 justify-center w-full h-full my-auto mr-5 ">
            <div className="cursor-pointer" onClick={props.closeModal}><IoMdArrowRoundBack size={20} /></div>
            <h1 className="text-2xl font-bold mt-4 mb-10">Monedero</h1>
            <p className='text-slate-400 text-sm mb-5'>Añade un método de pago para realizar tus envíos y recibir el dinero de tus trayectos.</p>
                {/* aqui pregunto si existe una tarjeta añadida, si existe muestro este div */}
                {
                    myCard?.card ? (
                        <div>
                            <div className='flex justify-between items-center border-b pb-4 mb-4' >
                                <div className="flex gap-x-3">
                                    <div className="p-2 bg-visaPink rounded-xl text-blue-800">
                                        {
                                            myCard.card.brand === 'visa' 
                                            ? <RiVisaLine size={30} />
                                            : myCard.card.brand === 'American Express'
                                            ? <SiAmericanexpress size={30} />
                                            : myCard.card.brand === 'Diners Club'
                                            ? <FaCcDinersClub size={30} />
                                            : myCard.card.brand === 'Discover'
                                            ? <FaCcDiscover size={30} />
                                            : myCard.card.brand === 'MasterCard'
                                            ? <FaCcMastercard size={30} />
                                            : myCard.card.brand === 'JCB'
                                            ? <SiJcb size={30} />
                                            : <FaRegCreditCard size={30} />
                                        }
                                    </div>
                                    <div>
                                        <p>...{myCard.card.last4}</p>
                                        <p className="text-slate-400">{myCard.card.exp_month}/{myCard.card.exp_year}</p>
                                    </div>
                                </div>
                                <div className="text-green-600">
                                <FaRegCheckCircle size={30} />
                                </div>
                            </div>
                            <button 
                            onClick={() => setModalOpen(true)}
                            className='bg-pink w-full disabled:opacity-70 m-2 text-white font-bold rounded-xl p-3'>Cambiar método de pago</button>
                        </div> 
                    ) : (
                        <div>
                            
                            <div className="flex flex-col w-64">
                                <Elements stripe={stripePromise}>
                                    <AuxMonedero changeLoad={changeLoad} />
                                </Elements>
                            </div>
                        </div>
                    )
                } 
                {modalOpen && (
                    <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="bg-white p-4 rounded-xl">
                        <ModalChangeCard closeModal={closeModal} closeWithChange={closeWithChange} />
                      </div>
                    </div>
                )}           
        </div>
    )
}

export default Monedero;

