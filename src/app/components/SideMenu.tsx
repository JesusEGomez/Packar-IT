import React from 'react'
import { FaCity } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { FaFingerprint } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { MdOutlineWallet } from "react-icons/md";
import { IoChatbox } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

export const SideMenu = () => {
  return (
    <div>
        <h1 className='text-xl'>Datos personales</h1>
        <ul className='p-3'>
            <li className='flex gap-x-2 font-bold'><FaCity size={20} />Ciudad</li>
            <li className='flex gap-x-2 font-bold'><MdOutlinePhone size={20} />Telefono</li>
            <li className='flex gap-x-2 font-bold'><FaFingerprint size={20} />Documento identificador</li>
            <li className='flex gap-x-2 font-bold'><BsCardChecklist size={20} />Vehiculo</li>
        </ul>
        <h1 className='text-xl'>Cuenta</h1>
        <ul className='border-b border-black p-3 '>
            <li className='flex gap-x-2 font-bold'><MdOutlineWallet size={20} />Monedero</li>
            <li className='flex gap-x-2 font-bold'><IoChatbox size={20} />Opiniones</li>
            <li className='flex gap-x-2 font-bold'><MdNotificationsNone size={20} />Notificaciones</li>

        </ul>
        <ul className='p-3'>
            <li className='flex gap-x-2 font-bold'><IoShieldCheckmarkOutline size={20} />Aviso legal y Privaciodad</li>
            <li className='flex gap-x-2 font-bold'><IoSettingsOutline size={20} />Ajustes</li>
            <li className='flex gap-x-2 font-bold'><MdLogout size={20} />Cerrar sesion</li>
        </ul>
    </div>
  )
}
