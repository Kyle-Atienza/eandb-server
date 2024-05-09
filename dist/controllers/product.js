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
const { Product, ProductItem } = require("../models/product");
const getProducts = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const products = await Product.find();
    const products = yield Product.aggregate([
        {
            $lookup: {
                from: "productitems",
                localField: "_id",
                foreignField: "details",
                as: "options",
            },
        },
        {
            $unwind: { path: "$options", preserveNullAndEmptyArrays: true },
        },
        {
            $group: {
                _id: {
                    product: "$_id",
                    name: "$options.name",
                },
                options: {
                    $addToSet: "$options",
                },
            },
        },
        {
            $set: {
                _id: "$_id.product",
                items: {
                    name: "$_id.name",
                    options: "$options",
                },
            },
        },
        {
            $group: {
                _id: "$_id",
                items: {
                    $addToSet: "$items",
                },
            },
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "details",
            },
        },
        {
            $unwind: { path: "$details", preserveNullAndEmptyArrays: true },
        },
        {
            $set: {
                name: "$details.name",
                description: "$details.description",
                gallery: "$details.gallery",
                sort: {
                    $cond: {
                        if: { $eq: ["$details.sort", 0] },
                        then: Number.POSITIVE_INFINITY,
                        else: "$details.sort",
                    },
                },
            },
        },
        {
            $unset: "details",
        },
        {
            $sort: { sort: 1 },
        },
    ]);
    res.status(200).json(products);
}));
const getProductItems = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let products = yield ProductItem.find().populate("details attributes");
    res.status(200).json(products);
}));
const getProductList = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { group } = req.query;
    let products = yield Product.aggregate([
        {
            $match: group ? { group: group } : {},
        },
        {
            $lookup: {
                from: "productitems",
                localField: "_id",
                foreignField: "details",
                as: "options",
            },
        },
        {
            $unwind: { path: "$options", preserveNullAndEmptyArrays: true },
        },
        {
            $lookup: {
                from: "productoptions",
                localField: "options.attributes",
                foreignField: "_id",
                as: "options.attributes",
            },
        },
        {
            $group: {
                _id: {
                    product: "$_id",
                    name: "$options.name",
                },
                name: {
                    $first: {
                        $cond: [
                            { $ne: ["$options.name", ""] }, // If options.name is not empty
                            { $concat: ["$name", " ", "$options.name"] }, // Concatenate name and options.name
                            "$name", // Otherwise, use just the name field
                        ],
                    },
                },
                options: {
                    $addToSet: "$options",
                },
            },
        },
        {
            $lookup: {
                from: "products",
                localField: "_id.product",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $group: {
                _id: "$name",
                options: { $first: "$options" },
                details: { $first: "$product" },
            },
        },
        {
            $set: {
                name: "$_id",
                _id: {
                    $toLower: {
                        $replaceAll: {
                            input: "$_id",
                            find: " ",
                            replacement: "-",
                        },
                    },
                },
            },
        },
        {
            $unwind: { path: "$details", preserveNullAndEmptyArrays: true },
        },
        {
            $sort: { "details.name": 1 },
        },
    ]);
    res.status(200).json(products);
}));
const createProduct = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name) {
        res.status(400);
        throw new Error("Please add a all required fields");
    }
    const product = yield ProductItem.create(req.body);
    res.status(200).json(product);
}));
const script = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield Product.updateMany({}, { group: "" });
    res.status(200).json(response);
}));
module.exports = {
    getProducts,
    getProductItems,
    getProductList,
    createProduct,
    script,
};
