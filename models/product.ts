import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

declare global {
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
}

// product
const ProductSchema = new mongoose.Schema({
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
const Product = mongoose.model<ProductDoc>("Product", ProductSchema);

// product option
const ProductOptionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Size", "Flavor"],
  },
  value: String,
});
const ProductOption = mongoose.model<ProductOptionDoc>(
  "ProductOption",
  ProductOptionSchema
);

// product item
const ProductItemSchema = new mongoose.Schema({
  name: {
    // temp
    type: String,
    required: [true, "Please add an name"],
  },
  details: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  amount: {
    type: Number,
    required: [true, "Please add an amount"],
  },
  attributes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "ProductOption",
    },
  ],
  stock: {
    type: Number,
    default: 0,
  },
});
const ProductItem = mongoose.model<ProductItemDoc>(
  "ProductItem",
  ProductItemSchema
);

module.exports = {
  ProductOption,
  Product,
  ProductItem,
};
