import mongoose from "mongoose";

declare global {
  interface ProductDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: String;
    attribute?: String;
    image: String;
    amount: Number;
  }
}

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add an name"],
    },
    attribute: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: [true, "Please add an image"],
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model<ProductDoc>("Product", ProductSchema);
