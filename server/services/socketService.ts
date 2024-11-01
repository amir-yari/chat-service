import { Socket } from "socket.io";
import z from "zod";
import mongoose from "mongoose";
import { ClientToServerEvent, io, ServerToClientEvent } from "../server";
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
  senderId: z.string().min(1),
  receiverId: z.string().min(1),
  sessionId: z.string().min(1).optional(),
});

const userSocketMap = new Map();

export const socketService = () => {
  io.on(
    "connection",
    async (socket: Socket<ClientToServerEvent, ServerToClientEvent>) => {
      console.log("New client connected", socket.id);
      const userId = socket.handshake.query.userId;
      userSocketMap.set(userId, socket.id);

      socket.on("sendMessage", async (data) => {
        const result = await addMessageSchema.safeParseAsync(data);

        if (!result.success) {
          console.log("Validation error:", result.error.errors);
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
        }

        io.to(savedMessage.sessionId as string).emit(
          "receiveMessage",
          savedMessage
        );
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    }
  );
};
