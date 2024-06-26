import { populate } from "dotenv";
import { Response } from "express";
import { findSourceMap } from "module";
import mongoose from "mongoose";

const asyncHandler = require("express-async-handler");

const { ProductItem } = require("../models/product");
const { Order, CartItem, OrderAddress } = require("../models/order");

const populateCartItems = {
  path: "items",
  /* populate: {
    path: "product",
    populate: {
      path: "details attributes",
    },
  }, */
};

const findCart = async (userId: String) => {
  const cart = await Order.findOne({
    user: userId,
    status: "Not processed",
  }).populate(populateCartItems);

  // return cart ? cart.populate("items.product") : cart;
  return cart;
};

const getOrders = asyncHandler(async (req: AppRequest, res: Response) => {
  const carts = await Order.find({
    user: req.user._id,
  }).populate("items");

  res.status(200).json(carts);
});

const getCart = asyncHandler(async (req: AppRequest, res: Response) => {
  try {
    res.status(200);
    res.json(await findCart(req.user._id));
  } catch (error) {
    res.status(400);
    throw new Error("Cannot retrieve cart");
  }
});

const add = asyncHandler(async (req: AppRequest, res: Response) => {
  let cart = await findCart(req.user._id);

  const productItem = await ProductItem.findById(req.body.productItemId);
  const newCartItemData = {
    productItemId: productItem._id,
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
      (item: any) => item.productItemId.toString() === req.body.productItemId
    );

    if (cartItem) {
      await CartItem.findByIdAndUpdate(cartItem._id, {
        $inc: { count: req.body.count || 1 },
      });
      cart = await findCart(req.user._id);
    } else {
      const newCartItem = await CartItem.create(newCartItemData);
      cart = await Order.findOneAndUpdate(
        { user: req.user._id, status: "Not processed" },
        { $push: { items: newCartItem._id } },
        { new: true }
      ).populate(populateCartItems);
    }
  }

  res.status(200).json(cart);
});

const remove = asyncHandler(async (req: AppRequest, res: Response) => {
  let cart = await findCart(req.user._id);

  const cartItem = cart.items.find(
    (item: any) => item.productItemId.toString() === req.body.productItemId
  );

  await CartItem.deleteOne({ _id: cartItem._id });

  cart = await Order.findOneAndUpdate(
    { user: req.user._id, status: "Not processed" },
    { $pull: { items: cartItem._id } },
    { new: true }
  ).populate(populateCartItems);
  res.status(200).json(cart);
});

const getAddresses = asyncHandler(async (req: AppRequest, res: Response) => {
  const addresses = await OrderAddress.find({ user: req.user._id });

  res.status(200).json(addresses);
});

const updateAddress = asyncHandler(async (req: AppRequest, res: Response) => {
  const { id } = req.params;

  const address = await OrderAddress.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  res.status(200).json(address);
});

const deleteAddress = asyncHandler(async (req: AppRequest, res: Response) => {
  const { id } = req.params;

  await OrderAddress.findOneAndDelete({ _id: id });

  res.status(200).json({ message: `Address ID ${id} Deleted` });
});

const createAddress = asyncHandler(async (req: AppRequest, res: Response) => {
  const address = await OrderAddress.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(200).json(address);
});

module.exports = {
  findCart,
  getCart,
  getOrders,
  add,
  remove,
  createAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
};
