"use client";
import React, { useEffect, useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";

import { useContext } from "react";
import { SidebarContext } from "../Provider";
import Link from "next/link";
import useNotifications from "../hooks/useNotifications";

const BottmBar = () => {
  const { sideBarControl, isOpen } = useContext(SidebarContext);
  const pathName = usePathname();
  const navigate = useRouter();
  const { sendNotification, subscribeToNotifications, notifications } = useNotifications();
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);

  useEffect(() => {
    // Suscribirse a las notificaciones y actualizar el estado de las notificaciones no leídas
    subscribeToNotifications((data) => {
      setUnreadNotifications((prevCount) => prevCount + 1);

      alert(`Nuevo mensaje: ${data.message} - Enviado por: ${data.userId}`);

    });
  }, [subscribeToNotifications]);

  const handleButtonClick = () => {
    // Marcar las notificaciones como leídas al hacer clic en el botón
    setUnreadNotifications(0);

    // Enviar una notificación solo como ejemplo (puedes enviar la notificación al servidor aquí)
    sendNotification({
      userId: "1",
      message: "¡Nuevo mensaje recibido!",
      timestamp: Date.now(),
    });
  };

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
            onClick={handleButtonClick}
            className={`flex text-xs flex-col items-center text-xs`}
          >
            <MdOutlineMessage size={30} />
            {unreadNotifications > 0 && (
              <span className="text-red-500">{unreadNotifications}</span>
            )}
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
