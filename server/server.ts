import http from "http";
import api from "./app";
import express from "express";
import mongoose from "mongoose";
import { Server as SocketIOServer } from "socket.io";

import { socketService } from "./services/socketService";
import {
  type ClientToServerEvent,
  type ServerToClientEvent,
} from "./utils/socketEventsTypes";

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

socketService();
io.use((socket, next) => {
  next();
});
