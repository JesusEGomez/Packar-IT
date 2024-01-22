import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { PiBracketsSquareDuotone } from "react-icons/pi";
import { FaWeightHanging } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Success from './Success';

function Confirmacion(props: any) {
  const {envio, driver} = props;
  const navigate = useRouter();
  const { data: session } = useSession();
  const [success, setSuccess] = useState(false);
  const solicitarHandler = async () => {
    try {
      // Fetch user ID
      const userResponse = await fetch(`/api/auth/myid/?email=${session?.user?.email}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user ID');
      }
    
      const user = await userResponse.json();
      
      // Create shipment
      const shipmentResponse = await fetch('/api/auth/envio', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          usuario: user._id,
          desde: envio.desde,
          hasta: envio.hasta,
          cuando: envio.cuando,
          producto: envio.producto,
          recibe: envio.recibe,
          driver: driver._id
        }),
      });

      if (!shipmentResponse.ok) {
        throw new Error('Failed to create shipment');
      }
    
      const shipmentData = await shipmentResponse.json();
      console.log(shipmentData);
      
      // Add shipment to the trip
      const updateResponse = await fetch('/api/auth/viajes', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
          viajeId: driver._id,
          data: shipmentData,
          prod: envio.producto
        }),
      });
    
      if (!updateResponse.ok) {
        throw new Error('Failed to update trip with shipment');
      }
    
      const updated = await updateResponse.json();
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
  },[])
  return (
    <div className='flex flex-col p-4'>
       <div className='m-2' onClick={props.closeModal}><FaArrowLeft size={30} /></div> 
       <h1 className='text-3xl'>Tu solicitud de envío</h1>
       <div>
        <div>
          <h1 className='text-lg'>{envio.producto.name}</h1>
          <p className='font-bold'>Paquete {envio.producto.size.toLowerCase()}</p>
        </div>
        <div>
          {
            envio.producto.size == 'Special' ? 'Precio a tratar con el conductor' :
            envio.producto.size == 'Pequeño' ? `${driver.precio[0].price}€` :
            envio.producto.size == 'Mediano'? `${driver.precio[1].price}€` :
            `${driver.precio[2].price}€`
          }
        </div>
        <div className='border m-2 p-3'>
          <div className='flex gap-y-4'>
            <p className='font-bold'>{driver.desde.ciudad}</p>
            <p className='font-bold'>{driver.horaSalida}</p>
          </div>
          <div className='flex gap-y-4'>
            <p className='font-bold'>{driver.hasta.ciudad}</p>
            <p className='font-bold'>{driver.horaLlegada}</p>
          </div>
          <div>
            <div className='flex gap-x-4'>
              <PiBracketsSquareDuotone size={20} />
              <p className='font-bold'>
              {
                envio.producto.size == 'Pequeño' ? '64x30cm' :
                envio.producto.size == 'Mediano'? '91x37cm' :
                '67x44cm'
              }
              </p>
            </div>
            <div className='flex gap-x-4'>
              <FaWeightHanging size={20} />
              <p className='font-bold'>{envio.producto.weigth}</p>
            </div>
            <div className='flex gap-x-4'>
              <FaRegCalendarAlt size={20} />
              <p className='font-bold'>{driver.cuando}</p>
            </div>
          </div>
        </div>
        <div className='border m-2 p-3'>
          <h1 className='text-xl'>Destinatario:</h1>
          <div className='flex gap-x-4 font-bold'><FaRegUserCircle size={20} /> {envio.recibe.nombreApellidos}</div> 
          <div className='flex gap-x-4 font-bold'><MdAlternateEmail size={20} />{envio.recibe.email}</div>
          <div className='flex gap-x-4 font-bold'><CiPhone size={20} />{envio.recibe.telefono}</div>
        </div>
        <div className='border-b m-2'>
          <h1 className='text-lg'>Viajero</h1>
          <div className='flex gap-x-4'>
            <FaRegUserCircle size={20}/>
            <p className='font-bold mb-2'>{driver.usuario.fullname}</p>
          </div>
        </div>
        <div>
          <button
            className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-b-xl p-3"
            onClick={solicitarHandler}>Solicitar envio</button>
          <button
          className="bg-white w-full disabled:opacity-70 text-black font-bold rounded-b-xl p-3"
          onClick={() => navigate.refresh()}>Cancelar envio</button>
        </div>
       </div>
       {success && (
        <div className="fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <Success />
          </div>
        </div>
      )}
    </div>
  )
}

export default Confirmacion