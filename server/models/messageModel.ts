import mongoose, { Schema } from "mongoose";

export interface Message {
  text: string;
  senderId: string;
  receiverId: string;
  sessionId: mongoose.Types.ObjectId | string | undefined;
}

const messageSchema: Schema<Message> = new mongoose.Schema(
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
  },
  { timestamps: true }
);

export default mongoose.model<Message>("Message", messageSchema);
