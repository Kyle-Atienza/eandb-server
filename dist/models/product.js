"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema;
/* declare global {
  interface ProductDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    gallery: string[];
    sort: number;
  }
  interface ProductItemDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    amount: number;
    //new
    details: mongoose.Types.ObjectId;
    attributes: mongoose.Types.ObjectId[];
    stock: number;
  }
  interface ProductOptionDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    type: string;
    value: string;
  }

  interface ProductListingItemDoc extends ProductDoc {
    options: ProductItemDoc[];
  }
} */
// product
const ProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    description: String,
    gallery: [String],
    sort: {
        type: Number,
        default: 0,
    },
    group: {
        type: String,
        enum: ["oyster-mushroom", "banana", "taro"],
    },
});
const Product = mongoose_1.default.model("Product", ProductSchema);
// product option
const ProductOptionSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ["Size", "Flavor"],
    },
    value: String,
});
const ProductOption = mongoose_1.default.model("ProductOption", ProductOptionSchema);
// product item
const ProductItemSchema = new mongoose_1.default.Schema({
    name: {
        // temp
        type: String,
        required: [true, "Please add an name"],
    },
    details: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Product",
    },
    amount: {
        type: Number,
        required: [true, "Please add an amount"],
    },
    attributes: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "ProductOption",
        },
    ],
    stock: {
        type: Number,
        default: 0,
    },
});
const ProductItem = mongoose_1.default.model("ProductItem", ProductItemSchema);
module.exports = {
    ProductOption,
    Product,
    ProductItem,
};
