import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

declare global {
  interface ProductDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    gallery: string[];
  }
  interface ProductItemDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: String;
    amount: Number;
    //new
    details: mongoose.Types.ObjectId;
    attributes: mongoose.Types.ObjectId[];
  }
  interface ProductOptionDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    type: string;
    value: string;
  }
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  description: String,
  gallery: [String],
});

const ProductOptionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Size", "Flavor"],
  },
  value: String,
});

const ProductItemSchema = new mongoose.Schema({
  name: {
    // temp
    type: String,
    required: [true, "Please add an name"],
  },
  details: {
    type: ObjectId,
    ref: "Product",
  },
  amount: {
    type: Number,
    required: [true, "Please add an amount"],
  },
  attributes: [
    {
      type: ObjectId,
      ref: "ProductOption",
    },
  ],
});

const Product = mongoose.model<ProductItemDoc>("Product", ProductSchema);
const ProductItem = mongoose.model<ProductItemDoc>(
  "ProductItem",
  ProductItemSchema
);
const ProductOption = mongoose.model<ProductDoc>(
  "ProductOption",
  ProductOptionSchema
);

module.exports = {
  ProductOption,
  Product,
  ProductItem,
};
