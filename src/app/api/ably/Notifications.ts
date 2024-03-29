
import ably from "./ably";
// import Profile from "@/models/perfil";
// import { connectDB } from "@/libs/mongodb";

export const sendNotification = (recipientUserId: string, data: { content: string }): void => {
  try {
    //console.log("Destinatario ID:", recipientUserId);
    //console.log("Contenido de la notificación:", data.content);
       
    const recipientNotificationChannel = `notifications-${recipientUserId}`;
    ably.channels.get(recipientNotificationChannel).publish("message", {
      content: data.content,
    });
  } catch (error) {
    console.error("Error al enviar la notificación:", error);
  }
};
