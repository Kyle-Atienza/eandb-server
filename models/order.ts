import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const OrderAddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  zip: {
    type: String,
    required: [true, "Please add a zip"],
  },
  phone: {
    type: String,
    required: [true, "Please add a phone number"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

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
    address: {
      shipping: [{ type: mongoose.Types.ObjectId, ref: "OrderAddress" }],
      billing: [{ type: mongoose.Types.ObjectId, ref: "OrderAddress" }],
    },
  },
  { timestamps: true }
);

const OrderAddress = mongoose.model<OrderAddressDoc>(
  "OrderAddress",
  OrderAddressSchema
);
const CartItem = mongoose.model<CartItemDoc>("CartItem", CartItemSchema);
const Order = mongoose.model<OrderDoc>("Order", OrderSchema);

module.exports = {
  OrderAddress,
  CartItem,
  Order,
};
