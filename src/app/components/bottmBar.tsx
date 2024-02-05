"use client";
import React, { useEffect, useContext, useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";

import { SidebarContext } from "../Provider";
import Link from "next/link";

import useUserState from "../store/sotre";
import { sendNotification } from "../api/ably/Notifications";

const BottmBar = () => {
  const { sideBarControl, isOpen } = useContext(SidebarContext);
  const recipientUserId = "65ae71c9f52787741b7a26d9";
  const { user } = useUserState((state) => state);

  const pathName = usePathname();
  const navigate = useRouter();

  return (
    //<div className="w-screen z-[999] fixed bottom-0 bg-white">
    <div className="w-screen fixed bottom-0 bg-white">
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
            Mis servicios
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
          onClick={() =>
            sendNotification(recipientUserId, `Holis este es mi id ${user._id}`)
          }
        >
          <MdOutlineMessage size={30} />
          Mensajess
        </button>
        <li>
          <button
            className={`flex ${
              pathName === "/messages" ? "text-pink" : "text-slate-600"
            } flex-col items-center text-xs`}
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
