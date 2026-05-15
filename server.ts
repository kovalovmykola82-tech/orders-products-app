import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? 3000);

const app = next({ dev, hostname, port });
const requestHandler = app.getRequestHandler();

void app.prepare().then(() => {
  const httpServer = createServer(requestHandler);

  const io = new Server(httpServer, {
    path: "/socket.io",
  });

  let activeSessions = 0;

  io.on("connection", (socket) => {
    activeSessions += 1;

    io.emit("active-sessions:update", activeSessions);

    socket.on("disconnect", () => {
      activeSessions = Math.max(activeSessions - 1, 0);

      io.emit("active-sessions:update", activeSessions);
    });
  });

  httpServer.listen(port, hostname, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
