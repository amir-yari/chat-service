import http from "http";
import api from "./app";
import express from "express";
import mongoose from "mongoose";
import { Socket, Server as SocketIOServer } from "socket.io";

const port = process.env.PORT || 8000;
const app = express();
app.use("/api", api);
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => {
    console.log("Database successfully connected");
    server.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error in connecting to database: ", err);
    process.exit(1);
  });

io.on("connection", (socket: Socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async (messageData) => {
    const { text, senderId, receiverId } = messageData;

    io.to(receiverId).emit("chat-message", { text, senderId });
    console.log("User connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
