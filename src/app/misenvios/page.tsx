'use client'
import React, { useState } from 'react';
import img from '../../../img/undraw_Happy_feeling_re_e76r.png';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GiPathDistance } from 'react-icons/gi';

type Viaje = {
  desde: { lat: number; lng: number };
  hasta: { lat: number; lng: number };
  cuando: string;
  horaSalida: string;
  horaLlegada: string;
  eresFlexible: boolean;
  viajero: {
    nombre: string;
    foto: string;
  };
  precio: string;
};

const viajes: Viaje[] = [
  // ... (tus datos existentes)
];

const MisEnvios: React.FC = () => {
  const [viajesDisponibles, setViajesDisponibles] = useState<Viaje[]>(viajes);
  const navigate = useRouter();

  return (
    <div className='flex flex-col'>
      <div className='m-10'>
        <button onClick={() => navigate.push('/loged')}>
          <FaArrowLeft />
        </button>
      </div>
      <div className='flex flex-col p-4 items-center'>
        <h1 className='text-2xl font-bold'>Mis Envíos</h1>
        <div className='border p-5'>box</div>
        <div>
          <Image src={img} width={250} height={250} alt='logo' />
        </div>
        <div className='flex flex-col items-center p-5'>
          <h1 className='text-2xl'>Oops! Nada por acá!</h1>
          <br />
          <p className='text-center m-2'>
            No encontramos trayectos con las características que indicaste.
          </p>
        </div>
        <button
          onClick={() => navigate.push('/loged')}
          className='flex w-full mt-20 justify-center bg-pink p-3 rounded text-white'
        >
          Volver
        </button>
      </div>
      {viajesDisponibles.length > 0 && (
        <div className='flex flex-col w-full m-2 p-4 gap-y-3'>
          <h1 className='text-xl'>Mis Envíos Disponibles</h1>
          {viajesDisponibles.map((viaje, index) => (
            <div className='flex flex-col border rounded shadow-lg p-4' key={index}>
              <div className='flex w-full justify-between px-4'>
                <div className='flex items-center'>
                  <div className='w-12 h-12 bg-gray-300 rounded-full mr-2'></div>
                  <p>{viaje.viajero.nombre}</p>
                </div>
                <p>{viaje.precio}€</p>
              </div>
              <div className='flex items-center mt-2'>
                <GiPathDistance
                  className={`{${viaje.eresFlexible} `? 'text-pink' : 'text-black'}
                  size={50}
                />
                <div className='ml-2'>
                  <p>
                    Desde: {viaje.desde.lat} {viaje.horaSalida}
                  </p>
                  <p>
                    Hasta: {viaje.hasta.lat} {viaje.horaLlegada}
                  </p>
                </div>
              </div>
              <div className='mt-2'>{viaje.cuando}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisEnvios;