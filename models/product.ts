import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

declare global {
  interface ProductGroupDoc extends mongoose.Document {
    name: string;
    description?: string;
    gallery: string[];
  }

  interface ProductOptionDoc extends mongoose.Document {
    type: string;
    value: string;
  }

  interface ProductDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: String;
    attribute?: String;
    image?: String;
    amount: Number;
    //new
    details: mongoose.Types.ObjectId;
    options: mongoose.Types.ObjectId[];
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

/* const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add an name"],
    },
    // may be removed
    attribute: {
      type: String,
      required: false,
    },
    image: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
    },
  },
  {
    timestamps: true,
  }
); */

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

/* const ProductGroup = mongoose.model<ProductDoc>(
  "ProductGroup",
  ProductGroupSchema
); */
const ProductOption = mongoose.model<ProductDoc>(
  "ProductOption",
  ProductOptionSchema
);
const Product = mongoose.model<ProductDoc>("Product", ProductSchema); // replace product group with this
const ProductItem = mongoose.model<ProductDoc>(
  "ProductItem",
  ProductItemSchema
);

module.exports = {
  // ProductGroup,
  ProductOption,
  Product,
  ProductItem,
};