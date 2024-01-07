'use client'
import React, { useEffect, useState } from 'react';
import img from '../../img/undraw_Happy_feeling_re_e76r.png';
import { FaArrowLeft } from "react-icons/fa";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GiPathDistance } from "react-icons/gi";

type viajes = {
  desde: {lat: number, lng: number}
  hasta: {lat: number, lng: number}
  cuando: string
  horaSalida: string
  horaLlegada: string
  eresFlexible: boolean
  viajero: {
    nombre: string
    foto: string
  }
}
const viajes = [
  {
    desde: {
      lat: -34.397,
      lng: 150.644,
    },
    hasta : {
      lat: -34.397,
      lng: 150.644,
    },
    cuando: '01-01-2021',
    horaSalida: '10:00:00',
    horaLlegada: '10:00:00',
    eresFlexible: true,
    viajero: {
      nombre:'cesar',
      foto: 'rrr'
    },
    precio: '30'
  },
  {
    desde: {
      lat: -34.397,
      lng: 150.644,
    },
    hasta : {
      lat: -34.397,
      lng: 150.644,
    },
    cuando: '01-01-2021',
    horaSalida: '10:00:00',
    horaLlegada: '10:00:00',
    eresFlexible: false,
    viajero: {
      nombre:'cesar',
      foto: 'rrr'
    },
    precio: '30'
  }
]
function Page() {
  //const [viajes, setViajes] = useState<[] | null>(null);
  const navigate = useRouter();
  const clickHandler = () => {

  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/auth/viajes');
  //     const data = await response.json();
  //     setViajes(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className='flex flex-col'>
      <div className='m-10'><button><FaArrowLeft /></button></div>
      <div className='flex flex-col p-4 items-center'>
        <h1 className='text-2xl font-bold'>Solicita tu envío a un viajero</h1>
        <div className='border p-5'>
          box
        </div>
        <div>
          <Image src={img} width={250} height={250} alt="logo" />
        </div>
        <div className='flex flex-col items-center p-5'>
          <h1 className='text-2xl'>Oops! Nada por acá!</h1>
          <br />
          <p className='text-center m-2'>No encontramos trayectos con las caracteristicas que indicaste.</p>
        </div>
        <button onClick={() => navigate.push('/loged')} className='flex w-full mt-20 justify-center bg-pink p-3 rounded text-white'>Volver</button>
      </div>
      {
        viajes && (
          <div className='flex flex-col fixed top-0 left-0 right-0 bottom-0 z-20 w-full h-full m-2 p-4 bg-white gap-y-3'>
            <h1 className='text-xl'>Viajeros disponibles</h1>
          {viajes.map((viaje, index) => (
            <div onClick={() => clickHandler()} className='flex flex-col border rounded cursor-pointer shadow-lg p-4' key={index}>
              <div className='flex w-full justify-between px-4'>
                <div className='flex'>
                  <div className='flex w-12 min-h-12'>foto</div>
                  {/* <Image src={viaje.viajero.foto} alt='avatar' width={50} height={50} /> */}
                  <p>{viaje.viajero.nombre}</p>
                </div>
                <p>{viaje.precio}€</p>
              </div>
              <div>
                <div className='flex'>
                  <GiPathDistance className={`${viaje.eresFlexible ? 'text-pink': 'text-black'}`} size={50} />
                  <div>
                    <p>Desde:{viaje.desde.lat} {viaje.horaSalida}</p>
                    <p>Hasta:{viaje.hasta.lat} {viaje.horaLlegada}</p>
                  </div>
                </div>
                {viaje.cuando}
              </div>
            </div>
          ))}
          </div>
        )
      }
    </div>
  )
}

export default Page