import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "ProductItem",
      required: [true, "Please add product"],
    },
    price: Number,
    count: Number,
  },
  { timestamps: true }
);

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    items: [{ type: mongoose.Types.ObjectId, ref: "CartItem" }],
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

const CartItem = mongoose.model<CartItemDoc>("CartItem", CartItemSchema);
const Order = mongoose.model<OrderDoc>("Order", OrderSchema);

module.exports = {
  CartItem,
  Order,
};
