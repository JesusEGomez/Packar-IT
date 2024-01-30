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
  /*   sendNotification: (notificationData: NotificationData) => void;
   */
  /*   subscribeToNotifications: (
    callback: (data: NotificationData) => void
  ) => void;
 */
  handleSendMessage: () => void; // Include handleSendMessage in the interface
}

const useNotifications = (): NotificationsHook => {
  const socketServerUrl =
    process.env.SOCKET_SERVER_URL || "http://localhost:3001";
  const socket: Socket = io(socketServerUrl);

  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);

  useEffect(() => {
    const initializeSocket = async () => {
      // Manejar el evento de conexión
      socket.on("connect", async () => {
        console.log("Conectado al servidor de sockets");

        // Obtener la información de sesión y emitir el evento "session"
        /*         const session = await getSession();
        console.log("Sending session information:ss", session);
        socket.emit("session sss", { session });
 */
        // ... otros eventos y lógica del socket
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
  }, [socket]);

  /*   const sendNotification = (notificationData: NotificationData): void => {
    socket.emit("send_notification", notificationData);
  };
 */
  /*   const subscribeToNotifications = (
    callback: (data: NotificationData) => void
  ): void => {
    socket.on("receive_notification", callback);
  };
 */
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
        // Manejar la lógica para usuarios no autenticados según sea necesario
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  return { /* sendNotification */ handleSendMessage };
};

export default useNotifications;
