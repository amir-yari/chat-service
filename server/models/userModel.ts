import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    // password: {
    //   type: String,
    //   required: true,
    // },
    // profilePicture: {
    //   type: String,
    //   default: "",
    // },
    // bio: {
    //   type: String,
    //   maxlength: 500,
    // },
    // gender: {
    //   type: String,
    //   enum: ["Male", "Female", "Other"],
    //   required: true,
    // },
    // age: {
    //   type: Number,
    //   required: true,
    //   min: 18,
    // },
    // interests: {
    //   type: [String],
    //   default: [],
    // },
    // location: {
    //   city: {
    //     type: String,
    //   },
    //   country: {
    //     type: String,
    //   },
    // },
    // lastOnline: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
