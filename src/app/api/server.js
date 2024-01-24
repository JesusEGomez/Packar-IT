const cors = require("cors")
const http = require("http");
const { Server } = require("socket.io");

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // socket to send notification 
  socket.on("send_notification", (data) => {
    console.log("Notification data:", data);
    // Puedes enviar la notificación a un usuario específico o a todos los usuarios conectados.
    io.emit("receive_notification", data);
  });

});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
