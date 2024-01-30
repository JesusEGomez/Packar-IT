import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getSession } from "next-auth/react";
import { SidebarContext } from "../Provider";
import { v4 as uuidv4 } from "uuid";

interface NotificationData {
  notificationId: string;
  notification: string;
}

interface Message {
  userId: string;
  message: string;
}

interface NotificationsHook {
  sendNotification: (notificationData: NotificationData) => void;
  subscribeToNotifications: (
    callback: (data: NotificationData) => void
  ) => void;
  handleSendMessage: () => void;
  acceptNotification: (notificationId: string) => void;
  cancelNotification: (notificationId: string) => void;
}

const useNotifications = (): NotificationsHook => {
  const socketServerUrl =
    process.env.SOCKET_SERVER_URL || "http://localhost:3001";
  const socket: Socket = io(socketServerUrl);

  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [receivedNotifications, setReceivedNotifications] = useState<
    NotificationData[]
  >([]);

  useEffect(() => {
    const initializeSocket = async () => {
      // Manejar el evento de conexión
      socket.on("connect", async () => {
        console.log("Conectado al servidor de sockets");

        // Obtener la información de sesión y emitir el evento "session"
        const session = await getSession();
        console.log("Sending session information:", session);
        socket.emit("session", { session });

        // Suscribirse a las notificaciones
        subscribeToNotifications((data) => {
          setReceivedNotifications((prevNotifications) => [
            ...prevNotifications,
            data,
          ]);
        });

        // ... otros eventos y lógica del socket
      });

      socket.on("receive_message", (data: Message) => {
        setReceivedMessages((prevMessages) => [...prevMessages, data]);
        console.log("Mensaje recibido en el cliente:", data);
      });

      socket.on("notification_accepted", (data: NotificationData) => {
        console.log(
          `Notificación ${data.notificationId} aceptada por el usuario`
        );
        // Puedes manejar la lógica adicional aquí si es necesario
      });

      socket.on("notification_canceled", (data: NotificationData) => {
        console.log(
          `Notificación ${data.notificationId} cancelada por el usuario`
        );
        // Puedes manejar la lógica adicional aquí si es necesario
      });
    };

    initializeSocket();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendNotification = (notificationData: NotificationData): void => {
    socket.emit("send_notification_to_user", notificationData);
  };

  const subscribeToNotifications = (
    callback: (data: NotificationData) => void
  ): void => {
    socket.on("receive_notification", callback);
  };

  const handleSendMessage = async () => {
    try {
      const userSession = await getSession();
      const user = userSession ? userSession.user : null;
      console.log("user", user);

      if (user) {
        const notificationData = {
          notificationId: uuidv4(),
          notification: "Algo ha sucedido",
        };

        socket.emit("send_message", notificationData);

        console.log(notificationData);

        sendNotification(notificationData);
      } else {
        console.log("El usuario no está autenticado");
        // Manejar la lógica para usuarios no autenticados según sea necesario
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  const acceptNotification = (notificationId: string) => {
    socket.emit("accept_notification", { notificationId });
  };

  console.log("Se acepta correctamente", acceptNotification);

  const cancelNotification = (notificationId: string) => {
    socket.emit("cancel_notification", { notificationId });
  };

  return {
    sendNotification,
    subscribeToNotifications,
    handleSendMessage,
    acceptNotification,
    cancelNotification,
  };
};

export default useNotifications;
