"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema;
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
const CartItemSchema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "ProductItem",
        required: [true, "Please add product"],
    },
    price: Number,
    count: Number,
}, { timestamps: true });
const OrderSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    items: [{ type: mongoose_1.default.Types.ObjectId, ref: "CartItem" }],
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
}, { timestamps: true });
const CartItem = mongoose_1.default.model("CartItem", CartItemSchema);
const Order = mongoose_1.default.model("Order", OrderSchema);
module.exports = {
    CartItem,
    Order,
};
