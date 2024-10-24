import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema(
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
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
