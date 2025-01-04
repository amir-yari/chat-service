import mongoose, { Schema } from "mongoose";

export interface User {
  _id: mongoose.Types.ObjectId;
  firebaseUid: string;
  firstName: string;
  lastName?: string;
  // username: string;
  email: string;
  profileImage?: string;
  contacts: mongoose.Types.ObjectId[];
  status: {
    isOnline: boolean;
    lastSeen: Date;
  };
}

const userSchema: Schema<User> = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true },
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
    },
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    email: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    contacts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    // status: {
    //   type: new mongoose.Schema({
    //     isOnline: {
    //       type: Boolean,
    //       required: true,
    //       default: false,
    //     },
    //     lastSeen: {
    //       type: Date,
    //       required: true,
    //       default: Date.now,
    //     },
    //   }),
    //   required: true,
    //   default: {},
    // },
  },
  { timestamps: true }
);

const User = mongoose.model<User>("User", userSchema);
export default User;
