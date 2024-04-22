import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");

const { Product, ProductItem } = require("../models/product");

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();

  res.status(200).json(products);
});

const getProductItems = asyncHandler(async (req: Request, res: Response) => {
  const products = await ProductItem.find()
    .populate("attributes")
    .populate({
      path: "details",
      options: { sort: "details.name" },
    });

  res.status(200).json(products);
});

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a all required fields");
  }

  const product = await Product.create(req.body);

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
  createProduct,

  script,
};
