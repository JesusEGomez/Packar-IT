import { Button } from '@/components/ui/button'
import React from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import { TbTriangleSquareCircle } from "react-icons/tb";

function ProdForm(props:any) {
    const close = () => {
        props.closeModal();
    };
    const siguiente = () => {
        props.closeFirstModal();
        props.closeModal();
    };
  return (
    <div>
        <Button
        onClick={() => close()}
        variant={"ghost"}
      >
        <IoMdArrowRoundBack />
      </Button>
      <div className='flex'>
        <h1 className='text-xl font-bold mb-4'>¿Qué vas a enviar?</h1>
        <FaExclamationCircle className='text-slate-400' />
      </div>
      <p className='text-sm text-slate-700'>Para poder ofreferte las mejores opciones, detallanos informacion sobre tu envío.</p>
      <form>
        <div className='flex items-center'>
          <TbTriangleSquareCircle className='text-slate-300' />
          <select className='p-2 rounded bg-white text-slate-300' name='types' id='types'>
            <option value="" disabled selected>Categoría de tu producto</option>
            <option value='Bebé'>Bebé</option>
            <option value='Belleza'>Belleza</option>
            <option value='Bricolaje y herramientas'>Bricolaje y herramientas</option>
            <option value='Deportes'>Deportes</option>
            <option value='Electrónica'>Electrónica</option>
            <option value='Equipaje'>Equipaje</option>
          </select>
        </div>
        <div>
          <input type="text" />
          hola
        </div>
      </form>
      <Button
        onClick={() => siguiente()}
        variant={"ghost"}
        className='bg-pink text-white w-full p-3 m-3 rounded-xl font-bold text-lg mx-auto'
      >
        Siguiente
      </Button>
    </div>
  )
}

export default ProdForm