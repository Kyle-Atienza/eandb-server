import { Response } from "express";
import mongoose from "mongoose";

const asyncHandler = require("express-async-handler");

const Product = require("../models/product");
const { Order, CartItem } = require("../models/order");

const findCurrentCart = async (userId: String) => {
  return await Order.findOne({
    user: userId,
    status: "Not processed",
  }).populate("items");
};

const getOrders = asyncHandler(async (req: AppRequest, res: Response) => {
  const carts = await Order.find({
    user: req.user._id,
  }).populate("items");

  res.status(200).json(carts);
});

const add = asyncHandler(async (req: AppRequest, res: Response) => {
  let cart = await findCurrentCart(req.user._id);

  const productItem = await Product.findById(req.body.productId);
  const newCartItemData = {
    product: productItem._id,
    price: productItem.amount,
    count: req.body.count || 1,
  };

  if (!cart) {
    const newCartItem = await CartItem.create(newCartItemData);
    cart = await Order.create({
      user: req.user._id,
      items: [newCartItem._id],
    });
    cart = await cart.populate("items");
  } else {
    const cartItem = cart.items.find(
      (item: any) => item.product.toString() === req.body.productId
    );

    if (cartItem) {
      await CartItem.findByIdAndUpdate(cartItem._id, {
        $inc: { count: req.body.count || 1 },
      });
      cart = await Order.findOne({
        user: req.user._id,
        status: "Not processed",
      }).populate("items");
    } else {
      const newCartItem = await CartItem.create(newCartItemData);
      cart = await Order.findOneAndUpdate(
        { user: req.user._id, status: "Not processed" },
        { $push: { items: newCartItem._id } },
        { new: true }
      ).populate("items");
    }
  }

  res.status(200).json(cart);
});

const remove = asyncHandler(async (req: AppRequest, res: Response) => {
  let cart = await findCurrentCart(req.user._id);

  const cartItem = cart.items.find(
    (item: any) => item.product.toString() === req.body.productId
  );

  await CartItem.deleteOne({ _id: cartItem._id });

  cart = await Order.findOneAndUpdate(
    { user: req.user._id, status: "Not processed" },
    { $pull: { items: cartItem._id } },
    { new: true }
  ).populate("items");

  res.status(200).json(cart);
});

module.exports = {
  getOrders,
  add,
  remove,
};
