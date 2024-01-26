import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { getSession } from "next-auth/react";

interface NotificationData {
  userId: string;
  message: string;
  timestamp: number;
}

interface NotificationsHook {
  sendNotification: (notificationData: NotificationData) => void;
  subscribeToNotifications: (
    callback: (data: NotificationData) => void
  ) => void;
}

const useNotifications = (): NotificationsHook => {
  const socket: Socket = io("http://localhost:3001");

  useEffect(() => {
    const initializeSocket = async () => {
      // Manejar el evento de conexión
      socket.on("connect", async () => {
        console.log("Conectado al servidor de sockets");

        // Obtener la información de sesión y emitir el evento "session"
        const session = await getSession();
        console.log("Sending session information:ss", session);
        socket.emit("session", { session });

        // ... otros eventos y lógica del socket
      });

      // Manejar otros eventos del socket según sea necesario
      // ...
    };

    initializeSocket();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendNotification = (notificationData: NotificationData): void => {
    socket.emit("send_notification", notificationData);
  };

  const subscribeToNotifications = (
    callback: (data: NotificationData) => void
  ): void => {
    socket.on("receive_notification", callback);
  };

  return { sendNotification, subscribeToNotifications };
};



export default useNotifications;
