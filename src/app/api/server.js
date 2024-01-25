const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { getSession } = require("next-auth/react");

const httpServer = http.createServer();



async function obtenerUserIdDeInicoSesion() {
  const session = await getSession();
  if (session) {
    // El usuario ha iniciado sesión, se puede acceder al userId y fullname
    return {
      userId: session.user.id,
      email: session.user.email,
      fullname: session.user.name,
    };
  } else {
    // El usuario no ha iniciado sesión, manejar según sea necesario
    return null;
  }
}

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000" || "https://packar-it.vercel.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log(`A user connected: ${socket.userInfo ? socket.userInfo.email : "Guest"} - ${socket.id}`);

  // Manejar el evento "session" para recibir la información de sesión del cliente
  socket.on("session", async ({ session }) => {
    console.log("Received session information:", session);

    // Puedes hacer lo que necesites con la información de sesión aquí
    // Por ejemplo, almacenarla en una variable de estado, asociarla con el socket, etc.
    // Asegúrate de implementar la lógica según tus necesidades específicas.
  });

  // Accede a la información del usuario proporcionada al conectarse.
  const userInfo = await obtenerUserIdDeInicoSesion();

  if (userInfo) {
    const { userId, fullname, email } = userInfo;
    socket.userInfo = { userId, fullname, email };
    console.log(`User ID: ${userId}, Fullname: ${fullname}`);
  }

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  socket.on("crear_envio", async (data) => {
    console.log("Solicitud de envío recibida:", data);
  
    if (userInfo) {
      const { userId, fullname } = userInfo;
      console.log(`Envío creado por ${fullname}`);
      // Aquí puedes agregar lógica adicional según las necesidades.
      // Puedes enviar notificaciones, actualizar el estado del envío, etc.
      io.emit("receive_notification", {
        message: `Tu envío ha sido creado por ${fullname}.`,
      });
      console.log("Notificación enviada: Tu envío ha sido creado.");
    } else {
      console.log("Envío creado por un usuario no autenticado");
      // Puedes manejar la lógica para usuarios no autenticados según sea necesario.
      // Por ejemplo, podrías enviar una notificación genérica o ignorar el evento.
    }
  });
  
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
