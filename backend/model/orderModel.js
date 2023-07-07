import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Unprocessed",
      enum: ["Unprocessed", "processing", "Shipped", "Delivered"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
