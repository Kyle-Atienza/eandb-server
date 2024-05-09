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
exports.getCart = void 0;
const Order = require("../models/order");
const asyncHandler = require("express-async-handler");
const getCart = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cart = yield Order.findOne({
            user: req.user._id,
            status: "Not processed",
        }).populate("items");
        /* if (!cart) {
          cart = [];
        } else {
          req.cart = cart;
        } */
    }
    catch (error) {
        res.status(400);
        throw new Error("Cart cannot be found");
    }
}));
exports.getCart = getCart;
