import http from "http";
import api from "./app";
import express from "express";
import mongoose from "mongoose";
import { Server as SocketIOServer } from "socket.io";

import { type Message } from "./models/messageModel";
import { socketService } from "./services/socketService";
export interface ServerToClientEvent {
  receiveMessage: (message: Message) => void;
}
export interface ClientToServerEvent {
  sendMessage: (message: Message) => void;
}

const port = process.env.PORT || 8000;
const app = express();
app.use("/api", api);
const server = http.createServer(app);

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

export const io = new SocketIOServer<ClientToServerEvent, ServerToClientEvent>(
  server,
  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  }
);

io.use((socket, next) => {
  socketService();
});
