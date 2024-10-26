import mongoose, { Schema } from "mongoose";

export interface Message {
  _id: mongoose.Types.ObjectId;
  text: string;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  sessionId: mongoose.Types.ObjectId;
}

const messageSchema: Schema<Message> = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
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
