import { type Message } from "../models/messageModel";

export interface ServerToClientEvent {
  receiveMessage: (message: Message) => void;
  error: (error: { message: string; details?: any[] }) => void;
  messageDelivered: (delivered: {
    _id: string;
    sessionId: string;
    status: string;
    updatedAt: Date;
  }) => void;
  messageReadUpdate: (sessionId: string) => void;
  contactsStatus: (contactsStatus: any) => void;
}

export interface ClientToServerEvent {
  sendMessage: (message: Message) => void;
  requestMessageRead: (
    sessionId: string,
    senderId: string,
    receiverId: string
  ) => void;
}
