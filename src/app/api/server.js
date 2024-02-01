import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { getSession } from "next-auth/react";


// Función para obtener el socket según el userId
function findSocketByUserId(userId) {
  return Array.from(io.sockets.sockets.values()).find(
    (socket) => socket.userInfo && socket.userInfo.userId === userId
  );
}

const httpServer = http.createServer();

// Variable para rastrear el estado de las notificaciones
const notifications = {};

async function obtenerUserIdDeInicoSesion(socket) {
  const session = await getSession({ req: socket.request });
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

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://packar-it.vercel.app"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log(
    `A user connected: ${socket.userInfo ? socket.userInfo.email : "Guest"} - ${socket.id}`
  );

  // Accede a la información del usuario proporcionada al conectarse.
  const userInfo = await obtenerUserIdDeInicoSesion(socket);

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
    socket.broadcast.emit("receive_message", data);
    socket.broadcast.emit("alert_new_message", {
      message: "Nuevo mensaje de !",
    });
  });
});

  socket.on(
    "send_notification_to_user",
    ({ notificationId, recipientUserId, notification }) => {
      const recipientSocket = findSocketByUserId(recipientUserId);
      if (recipientSocket) {
        notifications[notificationId] = { accepted: false, canceled: false };
        recipientSocket.emit("receive_notification", {
          notificationId,
          notification,
        });
      }
    }
  );

  socket.on("accept_notification", ({ notificationId }) => {
    const notification = notifications[notificationId];
    if (notification?.accepted || notification?.canceled) {
      return;
    }

    if (!notifications[notificationId]) {
      notifications[notificationId] = { accepted: false, canceled: false };
    }

    notifications[notificationId].accepted = true;
    const acceptingUser = socket.userInfo;

    console.log("Usuario que aceptó la notificación:", acceptingUser);

    io.to(socket.id).emit("notification_accepted", { notificationId });

    console.log("Te aceptaron la notificación");
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
