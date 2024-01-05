"use client";
import React, { useEffect } from "react";
import { IoSendOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";

import { useContext } from "react";
import { SidebarContext } from "../Provider";
const BottmBar = () => {
  const { sideBarControl, isOpen } = useContext(SidebarContext);
  const pathName = usePathname();

  return (
    <div className="w-screen ">
      <ul className="flex z-50 justify-between px-5 border-t mb-2 pt-2">
        <li>
          <button
            className={`flex ${
              pathName === "/send" ? "text-pink" : "text-slate-600"
            } flex-col items-center text-xs`}
          >
            <IoSendOutline size={30} />
            Enviar paquete
          </button>
        </li>
        <li>
          <button
            className={`flex ${
              pathName === "/shipments" ? "text-pink" : "text-slate-600"
            } flex-col items-center text-xs`}
          >
            <CiDeliveryTruck size={30} />
            Mis envios
          </button>
        </li>
        <li>
          <button
            className={`flex ${
              pathName === "/travel" ? "text-pink" : "text-slate-600"
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
