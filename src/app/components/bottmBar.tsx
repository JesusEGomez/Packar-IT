"use client";
import React, { useEffect, useContext, useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { SidebarContext } from "../Provider";
import Link from "next/link";
import useNotifications from "../hooks/useNotifications";


const BottmBar = () => {
  const { sideBarControl, isOpen } = useContext(SidebarContext);
  const {
    /* sendNotification, */ handleSendMessage,
    subscribeToNotifications,
    acceptNotification,
    cancelNotification,
    handleAcceptNotification,
  } = useNotifications();

  const pathName = usePathname();
  const navigate = useRouter();

 

  useEffect(() => {
    // Suscribirse a las notificaciones al montar el componente
    subscribeToNotifications((data: any) => {
      // Manejar la lógica cuando se recibe una notificación
      console.log("Notificación recibida:", data);
      // Puedes agregar lógica adicional según tus necesidades
    });

    // Limpiar la suscripción cuando el componente se desmonta
    return () => {
      // Desuscribirse de las notificaciones
      // (implementa la lógica de desuscripción según tus necesidades)
    };
  }, []); // El segundo arg





  return (
    <div className="w-screen z-[999] fixed bottom-0 bg-white">
      <ul className="flex justify-around px-2 border-t mb-2 pt-2">
        <li>
          <Link href={"/loged"}>
            <button
              className={`flex ${
                pathName === "/loged" ? "text-pink" : "text-slate-600"
              } flex-col items-center text-xs`}
            >
              <IoSendOutline size={30} />
              Enviar
            </button>
          </Link>
        </li>
        <li>
          <button
            onClick={() => navigate.push("/loged/misenvios")}
            className={`flex ${
              pathName === "/loged/misenvios" ? "text-pink" : "text-slate-600"
            } flex-col items-center text-xs`}
          >
            <CiDeliveryTruck size={30} />
            Mis servisios
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate.push("/loged/driver")}
            className={`flex ${
              pathName === "/loged/driver" ? "text-pink" : "text-slate-600"
            } flex-col items-center text-xs`}
          >
            <IoMdAddCircleOutline size={30} />
            Añadir viaje
          </button>
        </li>
        <button
          className={`flex ${
            pathName === "/messages" ? "text-pink" : "text-slate-600"
          } flex-col items-center text-xs`}
          onClick={handleSendMessage}
        >
          <MdOutlineMessage size={30} />
          Mensajess
        </button>
        <li>
          <button
            className={`flex ${
              pathName === "/messages" ? "text-pink" : "text-slate-600"
            } flex-col items-center text-xs`}
            onClick={handleAcceptNotification}
          >
            <MdOutlineMessage size={30} />
            Aceptar Mensajesss 
          </button>
        </li>       
        <li>
          <button
            onClick={sideBarControl}
            className={`flex ${
              isOpen ? "text-pink" : "text-slate-600"
            } flex-col items-center text-xs`}
          >
            <CgProfile size={30} />
            Perfil
          </button>
        </li>
      </ul>
    </div>
  );
};
export default BottmBar;
