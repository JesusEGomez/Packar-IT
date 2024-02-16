import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { TfiPackage } from "react-icons/tfi";
import ProdForm from './ProdForm';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import SpecialProdModal from './SpecialProdModal';

const array = [
  {
    size: 'Pequeño',
    area: '64x30cm',
    weight: '<5Kg'
  },
  {
    size: 'Mediano',
    area: '81x37cm',
    weight: '5-15Kg'
  },
  {
    size: 'Grande',
    area: '67x44cm',
    weight: '15-30Kg'
  }
];

export const ProdModal = (props : any) => {
  const [selectProduct, setSelectProduct] = useState<boolean>(false);
  const [specialProduct, setSpecialProduct] = useState<boolean>(false);
  const [size, setSize] = useState<string | null>(null);

  const openSpecial = () => {
    setSpecialProduct(true);
  }
  const openSelectProduct = (data:string) => {
    setSize(data);
    setSelectProduct(true);
  };
  const closeSelectProduct = (data:any) => {
    setSelectProduct(false);
  };
  const close = (data:any) => {
    props.closeModal(data);
  };
  const justClose = () => {
    setSelectProduct(false);
  }
  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-2xl font-bold mb-4'>¿Qué puedes enviar?</h1>
      <div className='flex gap-x-4'>
        {array.map((item, index) => (
          <button onClick={() => openSelectProduct(item.size)} className='border-2 relative border-slate-300 rounded p-3' key={index}>
            <div style={{ top: '-1px', left: '-10px' }} className='bg-pink text-white absolute text-xs font-bold p-1 px-2 justify-center rounded'>{item.weight}</div>
            <div className='flex flex-col items-center mt-6'>
              <TfiPackage className='text-slate-300' size={50} />
              <p className='text-sm font-bold mt-2'>{item.size}</p>
              <p className='text-sm font-bold'>{item.area}</p>
            </div>
          </button>
        ))}
      </div>
      <div className='flex justify-center border-t m-4'>
        <div 
        className='flex flex-col gap-y-3 items-center mt-6 border-2 border-slate-300 p-4 cursor-pointer rounded-xl'
        onClick={openSpecial}>
            <GiPerspectiveDiceSixFacesRandom className='text-slate-300' size={70} />
            <p className='font-bold text-sm'>Producto especial</p>
        </div>
      </div>
      <Button
        onClick={() => close(null)}
        variant={"ghost"}
        className="bg-pink text-white w-full p-3 m-3 rounded-xl font-bold text-lg mx-auto"
      >
        Cerrar
      </Button>
      {
        selectProduct && (
          <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl">
              <ProdForm closeModal={closeSelectProduct} size={size} closeFirstModal={close} />
            </div>
          </div>
        )
      }
      {
        specialProduct && (
          <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-xl">
              <SpecialProdModal closeModal={closeSelectProduct} justClose={justClose} closeFirstModal={close} />
            </div>
          </div>
        )
      }
    </div>
  )
}
