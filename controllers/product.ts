import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");
import mongoose from "mongoose";
import { pipeline } from "stream";

const { Product, ProductItem } = require("../models/product");
const { OrderAddress, Order } = require("../models/order");

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  // const products = await Product.find();
  const products = await Product.aggregate([
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
});

const getProductItems = asyncHandler(async (req: Request, res: Response) => {
  let products = await ProductItem.find().populate(
    "details attributes attribute"
  );

  res.status(200).json(products);
});

const getProductItem = asyncHandler(async (req: Request, res: Response) => {
  let productItem = await Product.aggregate([
    {
      $match: { code: req.params.code },
    },
    {
      $lookup: {
        from: "productitems",
        localField: "_id",
        foreignField: "details",
        pipeline: [
          {
            $lookup: {
              from: "productoptions",
              localField: "attribute",
              foreignField: "_id",
              as: "attribute",
            },
          },
          {
            $unwind: { path: "$attribute" },
          },
          {
            $sort: { default: -1 },
          },
        ],
        as: "variants",
      },
    },
  ]);

  res.status(200).json(productItem[0]);
});

const getProductList = asyncHandler(async (req: Request, res: Response) => {
  let productItem = await ProductItem.aggregate([
    {
      $match: {},
    },
    {
      $lookup: {
        from: "productoptions",
        localField: "attribute",
        foreignField: "_id",
        as: "attribute",
      },
    },
    {
      $unwind: { path: "$attribute", preserveNullAndEmptyArrays: true },
    },
    {
      $set: {
        attribute: {
          $cond: {
            if: { $eq: ["$attribute", []] },
            then: null,
            else: "$attribute",
          },
        },
      },
    },
    {
      $group: {
        _id: {
          product: "$details",
          option: "$name",
        },
        name: { $first: "$name" },
        variants: { $push: "$$ROOT" },
      },
    },
    {
      $group: {
        _id: "$_id.product",
        options: { $push: "$$ROOT" },
      },
    },
    {
      $unset: "options._id",
    },
    {
      $match: {
        _id: { $ne: null },
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
    // for sorting
    {
      $addFields: {
        sortField: {
          $cond: {
            if: { $eq: ["$details.sort", 0] },
            then: Number.POSITIVE_INFINITY,
            else: "$details.sort",
          },
        },
      },
    },
    {
      $sort: { sortField: 1 },
    },
    {
      $project: {
        sortField: 0,
      },
    },
  ]);

  res.status(200).json(productItem);
});

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a all required fields");
  }

  const product = await ProductItem.create(req.body);

  res.status(200).json(product);
});

const script = asyncHandler(async (req: Request, res: Response) => {
  // const response = await Product.updateMany({}, { group: "" });
  const response = await ProductItem.updateMany({}, { default: false });

  res.status(200).json(response);
});

module.exports = {
  getProducts,
  getProductItems,
  getProductItem,
  getProductList,
  // getProductList2,
  createProduct,

  script,
};
