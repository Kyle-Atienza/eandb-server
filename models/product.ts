import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

// product
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  description: String,
  taglines: String,
  gallery: [String],
  sort: {
    type: Number,
    default: 0,
  },
  group: {
    type: String,
    enum: ["oyster-mushroom", "banana", "taro"],
  },
  nutritionalFacts: [
    {
      content: String,
      value: String,
    },
  ],
  ingredients: [String],
  allergens: [String],
  awards: [String],
  netWeight: String,
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
