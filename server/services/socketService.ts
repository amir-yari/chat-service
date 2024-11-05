import { Socket } from "socket.io";
import z from "zod";
import mongoose from "mongoose";
import {
  type ClientToServerEvent,
  type ServerToClientEvent,
  io,
} from "../server";
import { Message } from "../models/messageModel";
import { storeMessage } from "./sessionService";

const isValidObjectId = (id: string | undefined) =>
  !!id && mongoose.Types.ObjectId.isValid(id);

const addMessageSchema = z.object({
  text: z.string().min(1),
  // senderId: z.string().refine(isValidObjectId, {
  //   message: "Invalid ObjectID format for senderId",
  // }),
  // receiverId: z.string().refine(isValidObjectId, {
  //   message: "Invalid ObjectID format for receiverId",
  // }),
  //   sessionId: z
  //     .string()
  //     .refine(isValidObjectId, {
  //       message: "Invalid ObjectID format for sessionId",
  //     })
  //     .optional(),
  senderId: z.string().min(1, { message: "Message text must not be empty" }),
  receiverId: z.string().min(1, { message: "Sender ID is required" }),
  sessionId: z
    .string()
    .min(1, { message: "Receiver ID is required" })
    .optional(),
});

const userSocketMap = new Map();

export const socketService = () => {
  io.on(
    "connection",
    (socket: Socket<ClientToServerEvent, ServerToClientEvent>) => {
      const userId = socket.handshake.query.userId;
      if (!userId) {
        socket.emit("error", { message: "User ID is required to connect." });
        socket.disconnect();
        return;
      }

      userSocketMap.set(userId, socket.id);

      socket.on("sendMessage", async (data) => {
        try {
          const parsedData = typeof data === "string" ? JSON.parse(data) : data;

          const result = await addMessageSchema.safeParseAsync(parsedData);
          if (!result.success) {
            socket.emit("error", {
              message: "Invalid message data",
              details: result.error.errors,
            });
            return;
          }

          const message = result.data;

          const savedMessage: Message = await storeMessage({
            text: message.text,
            senderId: message.senderId,
            receiverId: message.receiverId,
            sessionId: message.sessionId,
          });

          socket.join(savedMessage.sessionId as string);

          const receiverSocketId = userSocketMap.get(savedMessage.receiverId);
          const receiverSocket = io.sockets.sockets.get(receiverSocketId);

          if (receiverSocket) {
            receiverSocket.join(savedMessage.sessionId as string);
            io.to(savedMessage.sessionId as string).emit(
              "receiveMessage",
              savedMessage
            );
          } else {
            //TODO: handle the situation when the receiver is not connected
          }
        } catch (err) {
          socket.emit("error", {
            message: "Failed to process the message. Please try again later.",
            details: [err],
          });
        }
      });

      socket.on("disconnect", () => {
        userSocketMap.delete(userId);
      });
    }
  );
};
