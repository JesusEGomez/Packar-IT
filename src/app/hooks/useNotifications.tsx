import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface NotificationData {
  userId: string;
  message: string;
  timestamp: number;
}

interface NotificationsHook {
  sendNotification: (notificationData: NotificationData) => void;
  subscribeToNotifications: (callback: (data: NotificationData) => void) => void;
}

const useNotifications = (): NotificationsHook => {
  const socket: Socket = io("http://localhost:3001");

  useEffect(() => {
    return () => {
      // Desconectar el socket al desmontar el componente o dejar de escuchar eventos
      socket.disconnect();
    };
  }, [socket]);

  const sendNotification = (notificationData: NotificationData): void => {
    socket.emit("send_notification", notificationData);
  };

  const subscribeToNotifications = (callback: (data: NotificationData) => void): void => {
    socket.on("receive_notification", callback);
  };

  return { sendNotification, subscribeToNotifications };
};

export default useNotifications;
