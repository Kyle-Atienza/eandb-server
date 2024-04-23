import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");

const { Product, ProductItem } = require("../models/product");

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await ProductItem.find();

  res.status(200).json(products);
});

const getProductItems = asyncHandler(async (req: Request, res: Response) => {
  let products = await ProductItem.find().populate("details attributes");

  res.status(200).json(products);
});

const getProductList = asyncHandler(async (req: Request, res: Response) => {
  // let products = await ProductItem.find();
  let products = await Product.aggregate([
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
        name: { $first: { $concat: ["$name", " ", "$options.name"] } },
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
  ]);

  res.status(200).json(products);
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
  /* await ProductGroup.aggregate([
    {
      $out: "products", // Specify the destination collection
    },
  ]); */

  res.status(200);
});

module.exports = {
  getProducts,
  getProductItems,
  getProductList,
  createProduct,

  script,
};
