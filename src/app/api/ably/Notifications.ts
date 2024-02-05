import ably from "./ably";

export const sendNotification = (recipientUserId: string, content: string) => {
  const recipientNotificationChannel = `notifications-${recipientUserId}`;
  ably.channels.get(recipientNotificationChannel).publish("message", {
    content: content,
  });
};
