import mongoose, { Schema } from "mongoose";

export interface User {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage?: string;
}

const userSchema: Schema<User> = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<User>("User", userSchema);
