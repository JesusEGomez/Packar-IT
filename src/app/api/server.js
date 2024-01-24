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
  console.log("A user connected:", socket.email, socket.id);

  // Accede a la información del usuario proporcionada al conectarse.
  const userInfo = await obtenerUserIdDeInicoSesion();

  if (userInfo) {
    const { userId, fullname , email } = userInfo;
    socket.userInfo = { userId, fullname, email };
    console.log(`User ID: ${userId}, Fullname: ${fullname}`);
  }

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  // Evento para aceptar un viaje y enviar notificación
  socket.on("aceptar_viaje", async (data) => {
    console.log("Solicitud de Viaje recibida:", data);

    // Lógica para procesar la aceptación del viaje y enviar notificación.
    if (userInfo) {
      const { userId, fullname } = userInfo;
      console.log(`Viaje aceptado por ${fullname}`);
      // Aquí puedes agregar lógica adicional según las necesidades.
      // Puedes enviar notificaciones, actualizar el estado del viaje, etc.
      io.to(socket.id).emit("receive_notification", {
        message: `Tu viaje ha sido aceptado por ${fullname}.`,
      });
      console.log("Notificación enviada: Tu viaje ha sido aceptado.");
    } else {
      console.log("Viaje aceptado por un usuario no autenticado");
      // Puedes manejar la lógica para usuarios no autenticados según sea necesario.
    }

  });

 
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
