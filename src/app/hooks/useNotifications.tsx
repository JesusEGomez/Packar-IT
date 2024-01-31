import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getSession } from "next-auth/react";
import { SidebarContext } from "../Provider";

interface NotificationData {
  userId: string;
  message: string;
  timestamp: number;
}
interface Message {
  userId: string;
  message: string;
}

interface NotificationsHook {
  handleSendMessage: () => void;
}

const useNotifications = (): NotificationsHook => {
  const socketServerUrl = "https://socket-q0pz.onrender.com";
  const socket: Socket = io(socketServerUrl);

  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);

  useEffect(() => {
    const initializeSocket = async () => {
      socket.on("connect", async () => {
        console.log("Conectado al servidor de sockets");

        const session = await getSession();
        console.log("Sending session information:", session);
        socket.emit("session", { session });
      });
      socket.on("receive_message", (data: Message) => {
        setReceivedMessages((prevMessages) => [...prevMessages, data]);
        console.log("Mensaje recibido en el cliente:", data);
      });
    };

    initializeSocket();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      const userSession = await getSession();
      const user = userSession ? userSession.user : null;
      console.log("user", user);

      if (user) {
        const notificationData = {
          userId: user.name || "",
          message: "Algo ha sucedido",
          timestamp: Date.now(),
        };

        socket.emit("send_message", notificationData);
      } else {
        console.log("El usuario no está autenticado");
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  return { handleSendMessage };
};

export default useNotifications;
