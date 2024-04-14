import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");

const Product = require("../models/product");

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();

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

module.exports = {
  getProducts,
  createProduct,
};
