import mongoose, { Schema } from "mongoose";

export interface Session {
  _id: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
}

const sessionSchema: Schema<Session> = new mongoose.Schema({
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "User",
  },
});

const Session = mongoose.model<Session>("Session", sessionSchema);
export default Session;
