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
exports.checkProductExist = void 0;
const { ProductItem } = require("../models/product");
const asyncHandler = require("express-async-handler");
const checkProductExist = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.productId) {
            res.status(400);
            throw new Error("Product is not provided");
        }
        const product = yield ProductItem.findById(req.body.productId);
        if (!product) {
            res.status(400);
            throw new Error("Product does not exist");
        }
        next();
    }
    catch (error) {
        res.status(400);
        throw new Error("Product does not exist");
    }
}));
exports.checkProductExist = checkProductExist;
