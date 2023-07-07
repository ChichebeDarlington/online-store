import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
      required: true,
    },
    role: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
