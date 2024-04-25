import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");

const { Product, ProductItem } = require("../models/product");

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
      $lookup: {
        from: "productoptions",
        localField: "options.attributes",
        foreignField: "_id",
        as: "options.attributes",
      },
    },
    {
      $group: {
        _id: "$options.details",
        options: {
          $addToSet: "$options",
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
            if: { $eq: ["$details.sort", 0] }, // Check if the field equals 0
            then: 99, // Assign a high value for sorting
            else: "$details.sort", // Use the original field value for sorting
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
      $unwind: { path: "$details", preserveNullAndEmptyArrays: true },
    },
    {
      $sort: { "details.name": 1 },
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
  const response = await Product.updateMany({}, { sort: 0 });

  res.status(200).json(response);
});

module.exports = {
  getProducts,
  getProductItems,
  getProductList,
  createProduct,

  script,
};
