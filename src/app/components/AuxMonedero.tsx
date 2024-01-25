'use client'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

const AuxMonedero = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);

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
        const response = await fetch('/api/pago', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token.id }),
        });

        const data = await response.json();

        if (data.success) {
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
      <CardElement />
      <button className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-b-xl p-3" type="submit">Guardar Tarjeta</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default AuxMonedero;