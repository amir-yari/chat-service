import mongoose, { Schema } from "mongoose";

export interface Message {
  text: string;
  senderId: string;
  receiverId: string;
  sessionId: mongoose.Types.ObjectId | string | undefined;
}

export interface EncryptedMessage {
  text: string;
  senderId: string;
  receiverId: string;
  sessionId: mongoose.Types.ObjectId | string | undefined;
  iv: string;
}

const messageSchema: Schema<EncryptedMessage> = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Session",
    },
    iv: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<EncryptedMessage>("Message", messageSchema);
