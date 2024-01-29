const { createServer } = require("http");
const { Server } = require("socket.io");
const { getSession } = require("next-auth/react");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const httpServer = http.createServer();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};

const io = new Server(httpServer, {
  cors: corsOptions,
});

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

io.on("connection", async (socket) => {
  console.log(
    `A user connected: ${socket.userInfo ? socket.userInfo.email : "Guest"} - ${
      socket.id
    }`
  );

  // Manejar el evento "session" para recibir la información de sesión del cliente
/*   socket.on("session", async ({ session }) => {
    console.log("Receivedssss session information:", session);
 */
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

/*   socket.on("send_notification", (data) => {
    console.log("Se ha recibido una notificación:", data);
    // ... lógica adicional para manejar la notificación
  }); */

  // Cambia el nombre del evento de "send_notification" a "send_message"
  socket.on("send_message", (data) => {
    console.log("Mensaje recibido:", data);

    // Transmitir el mensaje a todos los usuarios conectados
    io.emit("receive_message", data);
  });

/*   // Definición del evento "receive_notification"
  socket.on("receive_notification", (data) => {
    console.log("Se ha recibido una notificación:", data);
    // ... lógica adicional para manejar la notificación
  });
 */

/*   socket.on("crear_envio", (data) => {
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
 */
;

nextApp.prepare().then(() => {
  httpServer.on("request", (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === "/socket.io/") {
      io.emit("request", req);
      io.emit("response", res);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  const PORT = process.env.PORT || 3001;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
