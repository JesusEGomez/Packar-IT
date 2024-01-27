"use client";
import React, { useEffect ,  useContext, useState} from "react";
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

import { getSession } from "next-auth/react";

interface Message {
  userId: string;
  message: string;
}


const BottmBar = () => {
  const { sideBarControl, isOpen } = useContext(SidebarContext);
  const pathName = usePathname();
  const navigate = useRouter();

  const { subscribeToNotifications } = useNotifications();
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);

  const socket = io("http://localhost:3001"); // Establecer conexión con el servidor Socket.io

  useEffect(() => {
    // Escuchar el evento "receive_message" del servidor
    socket.on("receive_message", (data: Message) => {
      // Actualizar el estado con el mensaje recibido
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    
      // Mostrar el mensaje en la consola del navegador
      console.log("Mensaje recibido en el cliente:", data);
    });
        
    return () => {
      socket.disconnect();
    };
  }, [socket]);


  const handleSendMessage = async () => {
    try {
      // Obtener la información del usuario de manera asíncrona
      const userSession = await getSession();
      const user = userSession ? userSession.user : null;
      console.log("user", user);

      if (user) {
        // Enviar notificación al servidor
        const notificationData = {
          userId: user.name || "",
          message: "Algo ha sucedido",
          timestamp: Date.now(),
        };

        socket.emit("send_message", notificationData);

        const handleNotification = (data: any) => {
          alert(`Nueva notificación de ${user.name}: ${data.message}`);
        };

        if (subscribeToNotifications) {
          subscribeToNotifications(handleNotification);
        }


      } else {
        console.log("El usuario no está autenticado");
        // Manejar la lógica para usuarios no autenticados según sea necesario
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
      // Manejar el error según sea necesario
    }
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
            className={`flex ${
              pathName === "/messages" ? "text-pink" : "text-slate-600"
            } flex-col items-center text-xs`}
            onClick={handleSendMessage}
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