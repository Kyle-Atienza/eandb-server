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

// product
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  description: String,
  gallery: [String],
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

/* const test = () => {
  Order.findById(orderId)
    .populate("items")
    .exec(function (err, order) {
      if (err) {
        console.error(err);
        // Handle error
        return;
      }

      // Populate the product details for each item
      Order.populate(
        order,
        {
          path: "items.product",
          model: "CartItem",
          populate: {
            path: "product.details",
            model: "ProductItem",
          },
        },
        function (err, populatedOrder) {
          if (err) {
            console.error(err);
            // Handle error
            return;
          }

          // populatedOrder now contains the populated items.product.details field
          console.log(populatedOrder);
        }
      );
    });
};
 */
