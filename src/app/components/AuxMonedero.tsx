'use client'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const AuxMonedero = (props:any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    try {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        setError(error.message || 'Hubo un error al procesar la tarjeta.');
      } else {
        // Enviar el token al servidor para guardar la tarjeta asociada al usuario
        const user = await fetch(`/api/auth/myid/?email=${session?.user?.email}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userAns = await user.json();
        console.log(userAns);
        
        const response = await fetch('/api/auth/pago', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token.id, userId: userAns }),
        });

        const data = await response.json();
        console.log(data);
        
        if (data.user) {
          console.log('Tarjeta guardada exitosamente');
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
    <form onSubmit={handleSubmit}>
      <CardElement className='m-3 p-2 h-10' />
      <button onClick={props.changeLoad} className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-xl p-3" type="submit">Guardar Tarjeta</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default AuxMonedero;
