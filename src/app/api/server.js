const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { getSession } = require("next-auth/react");

// Función para obtener el socket según el userId
function findSocketByUserId(userId) {
  return Array.from(io.sockets.sockets.values()).find(
    (socket) => socket.userInfo && socket.userInfo.userId === userId
  );
}

const httpServer = http.createServer();

// Variable para rastrear el estado de las notificaciones
const notifications = {};

async function obtenerUserIdDeInicoSesion() {
  const session = await getSession();
  if (session) {
    return {
      userId: session.user.id,
      email: session.user.email,
      fullname: session.user.name,
    };
  } else {
    return null;
  }
}

const corsOptions = {
  origin: "http://localhost:3000" || "https://packar-it.vercel.app",
  methods: ["GET", "POST"],
};

const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on("connection", async (socket) => {
  console.log(
    `A user connected: ${socket.userInfo ? socket.userInfo.email : "Guest"} - ${
      socket.id
    }`
  );

  const userInfo = await obtenerUserIdDeInicoSesion();

  if (userInfo) {
    const { userId, fullname, email } = userInfo;
    socket.userInfo = { userId, fullname, email };
    console.log(`User ID: ${userId}, Fullname: ${fullname}`);
  }

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  socket.on("send_message", (data) => {
    console.log("Mensaje recibido:", data);
   
    //const senderInfo = socket.userInfo || null

    // Incluye el nombre del remitente en la estructura del mensaje
    //const messageData = {
     // message: data.message,
      //senderId: senderInfo.userId
    //};
    //console.log(messageData);
    // Emitir el mensaje actualizado con el nombre del remitente
    io.emit("receive_message",);
    io.emit("alert_new_message", {
      message: "Nuevo mensaje de !",
    });
  });

  // Agrega el código para enviar notificaciones a un usuario específico
  socket.on(
    "send_notification_to_user",
    ({ notificationId, recipientUserId, notification }) => {
      const recipientSocket = findSocketByUserId(recipientUserId);
      if (recipientSocket) {
        // Almacenar el estado inicial de la notificación
        notifications[notificationId] = { accepted: false, canceled: false };

        recipientSocket.emit("receive_notification", {
          notificationId,
          notification,
        });
      }
    }
  );

  // Escuchar la aceptación de la notificación por parte de un usuario
  // ...

  // Escuchar la aceptación de la notificación por parte de un usuario

  socket.on("accept_notification", ({ notificationId }) => {
    // Verificar si la notificación existe y no ha sido aceptada o cancelada
    if (
      notifications[notificationId] &&
      !notifications[notificationId].accepted &&
      !notifications[notificationId].canceled
    ) {
      // Marcar la notificación como aceptada y enviar la confirmación al creador
      notifications[notificationId].accepted = true;

      // Obtener la información del usuario que aceptó la notificación
      const acceptingUser = socket.userInfo;

      // Guardar la información en el servidor o realiza la lógica que necesites
      console.log("Usuario que aceptó la notificación:", acceptingUser);

      // Enviar la confirmación al creador de la notificación
      io.to(socket.id).emit("notification_accepted", { notificationId });

      console.log("Te aceptaron la notificación");
    }
  });

  // ...
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});

/** // Escuchar la cancelación de la notificación por parte de un usuario
  socket.on("cancel_notification", ({ notificationId }) => {
    // Marcar la notificación como cancelada y enviar la confirmación al creador
    notifications[notificationId].canceled = true;
    socket.emit("notification_canceled", { notificationId });
  }); */
