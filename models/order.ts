import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

/* declare global {
  interface CartItemDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    price: Number;
    count: Number;
  }

  interface OrderDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    items: [mongoose.Types.ObjectId];
    amount: Number;
    address: String;
    status: {
      type: Number;
      default: 1;
    };
  }
} */

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
