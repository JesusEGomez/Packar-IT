import React from 'react';
import BottmBar from '../components/bottmBar';
import logo from '../../img/undraw_Deliveries_2r4y.png';
import Image from 'next/image';
import { RiMapPinAddLine } from "react-icons/ri";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";

export default () => {
  return (
    <div className='flex flex-col items-center bg-pink'>
    <Image className='my-16 rounded-full' src={logo} alt='logo' width={150} height={150} />
    <div className='bg-white w-full rounded-t-3xl pt-10'>
        {/* Contenido del segundo div */}
    </div>
    <div className='z-10 fixed top-48 left-20 right-20 bg-white border rounded-xl'>
      <div className='flex flex-col items-center gap-y-4'>
        <h1 className='font-bold mt-2'>¿Que deseas enviar?</h1>
        <button className='flex text-slate-400 gap-x-4 border-b p-2 mx-4'><RiMapPinAddLine size={30} />Desde</button>
        <button className='flex text-slate-400 gap-x-4 border-b p-2 mx-4'><RiMapPin2Fill size={30} />Hasta</button>
        <button className='flex text-slate-400 gap-x-4 border-b p-2 mx-4'><FaRegCalendarAlt size={30} />Cuando</button>
        <button className='flex text-slate-400 gap-x-4 border-b p-2 mx-4'><BsBoxSeam size={30} />Producto</button>
        <button className='bg-pink w-full text-white font-bold rounded-b-xl p-3'>Buscar</button>
      </div>
    </div>
    <div className='absolute bottom-0'>
        <BottmBar />
    </div>
</div>

  )
}
