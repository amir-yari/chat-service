import { type Message, type MessageStatus } from "../models/messageModel";

// Server-to-Client events
export interface ServerToClientEvent {
  receiveMessage: (message: Message) => void;
  error: (error: { message: string; details?: any[] }) => void;
  messageDelivered: (message: Message) => void;
  messageReadUpdate: (sessionId: string) => void;
}

// Client-to-Server events
export interface ClientToServerEvent {
  sendMessage: (message: Message) => void;
  requestMessageRead: (
    sessionId: string,
    senderId: string,
    receiverId: string
  ) => void;
}
