import { Request, Response } from "express";
import { Document } from "mongoose";

// global.d.ts
declare global {
  interface AppRequest extends Request {
    // Define your global type here
    user: Document;
    cart: OrderDoc;
  }

  // order
  interface OrderAddressDoc {
    _id: mongoose.Types.ObjectId;
    address: String;
    zip: String;
    phone: String;
    user: mongoose.Types.ObjectId;
  }
  interface CartItemDoc extends Document {
    _id: mongoose.Types.ObjectId;
    productItemId: mongoose.Types.ObjectId;
    // price: Number;
    count: Number;
  }

  interface OrderDoc extends Document {
    _id: mongoose.Types.ObjectId;
    items: [mongoose.Types.ObjectId];
    amount: Number;
    status: {
      type: Number;
      default: 1;
    };
    address: {
      shipping: mongoose.Types.ObjectId;
      billing: mongoose.Types.ObjectId;
    };
  }

  //product
  interface ProductDoc extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    gallery: string[];
    sort: number;
  }
  interface ProductItemDoc extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    amount: number;
    //new
    details: mongoose.Types.ObjectId;
    attributes: mongoose.Types.ObjectId[];
    stock: number;
  }
  interface ProductOptionDoc extends Document {
    _id: mongoose.Types.ObjectId;
    type: string;
    value: string;
  }

  interface ProductListingItemDoc extends ProductDoc {
    options: ProductItemDoc[];
  }

  //user
  interface UserDoc extends Document {
    _id: mongoose.Types.ObjectId;
    name: String;
    email: String;
    password: String;
    defaults: {
      address: {
        shipping: mongoose.Types.ObjectId;
        billing: mongoose.Types.ObjectId;
      };
    };
  }
  interface UserAddressDoc {
    _id: mongoose.Types.ObjectId;
    address: String;
    zip: String;
    phone: String;
  }
}
