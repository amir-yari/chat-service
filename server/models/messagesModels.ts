import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Messages", messageSchema);
