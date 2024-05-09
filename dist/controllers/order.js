"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require("express-async-handler");
const { ProductItem } = require("../models/product");
const { Order, CartItem } = require("../models/order");
const populateCartItems = {
    path: "items",
    populate: {
        path: "product",
        populate: {
            path: "details attributes",
        },
    },
};
const findCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Order.findOne({
        user: userId,
        status: "Not processed",
    }).populate(populateCartItems);
    // return cart ? cart.populate("items.product") : cart;
    return cart;
});
const getOrders = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield Order.find({
        user: req.user._id,
    }).populate("items");
    res.status(200).json(carts);
}));
const getCart = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200);
        res.json(yield findCart(req.user._id));
    }
    catch (error) {
        res.status(400);
        throw new Error("Cannot retrieve cart");
    }
}));
const add = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cart = yield findCart(req.user._id);
    const productItem = yield ProductItem.findById(req.body.productId);
    const newCartItemData = {
        product: productItem._id,
        price: productItem.amount,
        count: req.body.count || 1,
    };
    if (!cart) {
        const newCartItem = yield CartItem.create(newCartItemData);
        cart = yield Order.create({
            user: req.user._id,
            items: [newCartItem._id],
        });
        cart = yield cart.populate("items");
    }
    else {
        const cartItem = cart.items.find((item) => item.product._id.toString() === req.body.productId);
        if (cartItem) {
            yield CartItem.findByIdAndUpdate(cartItem._id, {
                $inc: { count: req.body.count || 1 },
            });
            cart = yield findCart(req.user._id);
        }
        else {
            const newCartItem = yield CartItem.create(newCartItemData);
            cart = yield Order.findOneAndUpdate({ user: req.user._id, status: "Not processed" }, { $push: { items: newCartItem._id } }, { new: true }).populate(populateCartItems);
        }
    }
    res.status(200).json(cart);
}));
const remove = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cart = yield findCart(req.user._id);
    const cartItem = cart.items.find((item) => item.product._id.toString() === req.body.productId);
    yield CartItem.deleteOne({ _id: cartItem._id });
    cart = yield Order.findOneAndUpdate({ user: req.user._id, status: "Not processed" }, { $pull: { items: cartItem._id } }, { new: true }).populate(populateCartItems);
    res.status(200).json(cart);
}));
module.exports = {
    findCart,
    getCart,
    getOrders,
    add,
    remove,
};
