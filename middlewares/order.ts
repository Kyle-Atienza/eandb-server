const Order = require("../models/order");
const asyncHandler = require("express-async-handler");
import { Response, NextFunction } from "express";

const getCart = asyncHandler(
  async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      let cart = await Order.findOne({
        user: req.user._id,
        status: "Not processed",
      }).populate("items");

      /* if (!cart) {
        cart = [];
      } else {
        req.cart = cart;
      } */
      console.log(cart);
    } catch (error) {
      res.status(400);
      throw new Error("Cart cannot be found");
    }
  }
);

export { getCart };
