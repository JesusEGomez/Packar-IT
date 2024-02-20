'use client'

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { CiLock } from "react-icons/ci";
import { MdAddCard } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const inputStyle = {
  base: {
    fontSize: '16px', 
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    '::placeholder': {
      color: '#aab7c4',
    },
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
  },
};

const AuxMonedero = (props: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      return;
    }

    try {
      const { token, error } = await stripe.createToken(cardNumberElement);

      if (error) {
        setError(error.message || 'Hubo un error al procesar la tarjeta.');
      } else {
        const user = await fetch(`/api/auth/myid/?email=${session?.user?.email}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userAns = await user.json();
        //console.log(userAns);
        
        const response = await fetch('/api/auth/pago', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token.id, userId: userAns }),
        });

        const data = await response.json();
        //console.log(data);
        
        if (data.user) {
          //console.log('Tarjeta guardada exitosamente');
          setSuccess(true);
          props.cloeseMonedero && props.cloeseMonedero();
        } else {
          setError('Error al procesar el pago.');
        }
      }
    } catch (error) {
      console.error('Error al procesar la tarjeta:', error);
      setError('Error al procesar la tarjeta.');
    }
  };

  return (
    <form className='flex flex-col gap-y-4 w-max' onSubmit={handleSubmit}>
      <div className='flex justify-evenly gap-x-2 my-2 items-center border-b text-slate-400'><MdAddCard />Tarjeta de crédito o débito <IoIosArrowForward /></div>
      <label className='border-b'>
        <span className='flex flex-row items-center gap-x-2'>Número de tarjeta <CiLock /></span>
        <CardNumberElement
          options={{ style: inputStyle }}
        />
      </label>
      <div className='flex gap-x-20'>
        <label className='border-b mb-4'>
          <span>Caducidad</span>
          <CardExpiryElement
            options={{ style: inputStyle }}
          />
        </label>
        <label className='border-b mb-2'>
          <span>CVV</span>
          <CardCvcElement
            options={{ style: inputStyle }}
          />
        </label>
      </div>
      <button
        onClick={props.changeLoad}
        disabled={success}
        className="bg-pink w-full disabled:opacity-70 mt-4 text-white font-bold rounded-xl p-3"
        type="submit"
      >
        {`${success ? 'Tarjeta añadida exitosamente' : 'Guardar Tarjeta'}`}
      </button>
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
};

export default AuxMonedero;


