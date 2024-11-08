import mongoose, { Schema } from "mongoose";

export enum MessageStatus {
  PENDING = "pending",
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
}

export interface Message {
  _id?: mongoose.Types.ObjectId | string;
  text: string;
  senderId: string;
  receiverId: string;
  sessionId?: mongoose.Types.ObjectId | string;
  status?: MessageStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EncryptedMessage extends Message {
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
    status: {
      type: String,
      required: true,
      enum: Object.values(MessageStatus),
      default: MessageStatus.PENDING,
    },
    iv: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<EncryptedMessage>("Message", messageSchema);
