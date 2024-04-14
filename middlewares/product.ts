const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
import { Response, NextFunction } from "express";

const checkProductExist = asyncHandler(
  async (req: AppRequest, res: Response, next: NextFunction) => {
    if (!req.body.productId) {
      res.status(400);
      throw new Error("Product is not provided");
    }

    try {
      await Product.findById(req.body.productId);

      next();
    } catch (error) {
      res.status(400);
      throw new Error("Product does not exist");
    }
  }
);

export { checkProductExist };
