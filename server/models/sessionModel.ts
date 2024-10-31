import mongoose, { Schema } from "mongoose";

export interface Session {
  participants: string[];
}

const sessionSchema: Schema<Session> = new mongoose.Schema(
  {
    participants: {
      type: [String],
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Session = mongoose.model<Session>("Session", sessionSchema);
export default Session;
