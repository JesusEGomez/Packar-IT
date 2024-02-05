
import ably from "./ably";


interface Location {
  latitude: number;
  longitude: number;
}


export const sendNotification = (recipientUserId: string, data: { content: string; location: Location }): void => {
  try {
    console.log("Destinatario ID:", recipientUserId);
    console.log("Contenido de la notificación:", data.content);

    const recipientNotificationChannel = `notifications-${recipientUserId}`;
    ably.channels.get(recipientNotificationChannel).publish("message", {
      content: data.content,
      location: data.location,
    });
  } catch (error) {
    console.error("Error al enviar la notificación:", error);
  }
};
