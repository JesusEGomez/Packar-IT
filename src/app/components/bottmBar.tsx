"use client";
import React, { useEffect } from "react";
import { IoSendOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";

import { useContext } from "react";
import { SidebarContext } from "../Provider";
import Link from "next/link";
import useNotifications from "../hooks/useNotifications"

const BottmBar = () => {
  const { sideBarControl, isOpen } = useContext(SidebarContext);
  const pathName = usePathname();
  const navigate = useRouter();

  const { subscribeToNotifications } = useNotifications();

  useEffect(() => {
    // Suscribirse a las notificaciones
    const handleNotification = (data: any) => {
      // Aquí puedes manejar la notificación, por ejemplo, mostrar una alerta
      alert(`Nueva notificación: ${data.message}`);
    };

    subscribeToNotifications(handleNotification);
    return () => {
      // Desuscribirse de las notificaciones
      // (asegúrate de manejar esto correctamente en el hook useNotifications)
    };
  }, [subscribeToNotifications]);




  return (
    <div className="w-screen z-50  fixed bottom-0 bg-white">
      <ul className="flex  justify-between px-5 border-t mb-2 pt-2">
        <li>
          <Link href={"/loged"}>
            <button
              className={`flex ${
                pathName === "/loged" ? "text-pink" : "text-slate-600"
              } flex-col items-center text-xs`}
            >
              <IoSendOutline size={30} />
              Enviar paquete
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
            Mis envios
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
        <li>
          <button
            className={`flex ${
              pathName === "/messages" ? "text-pink" : "text-slate-600"
            } flex-col items-center text-xs`}
          >
            <MdOutlineMessage size={30} />
            Mensajes
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
