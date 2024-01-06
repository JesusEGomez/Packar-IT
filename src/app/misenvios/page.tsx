'use client'
import React, { useState } from 'react';
import img from '../../img/undraw_Happy_feeling_re_e76r.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
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

const viajesDisponibles: Viaje[] = [
  {
    desde: { lat: 40.7128, lng: -74.0060 },
    hasta: { lat: 34.0522, lng: -118.2437 },
    cuando: '2024-01-05',
    horaSalida: '08:00 AM',
    horaLlegada: '05:00 PM',
    eresFlexible: true,
    viajero: {
      nombre: 'John Doe',
      foto: 'URL_de_la_imagen',
    },
    precio: '50',
  },
  {
    desde: { lat: 40.7128, lng: -74.0060 },
    hasta: { lat: 34.0522, lng: -118.2437 },
    cuando: '2024-01-05',
    horaSalida: '08:00 AM',
    horaLlegada: '05:00 PM',
    eresFlexible: true,
    viajero: {
      nombre: 'John Doe',
      foto: 'URL_de_la_imagen',
    },
    precio: '50',
  },
];

const MisEnvios: React.FC = () => {
  const navigate = useRouter();

  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl'>Aqui Irian mis envios si tuviera!!</h1>
    </div>
  );
};

export default MisEnvios;
