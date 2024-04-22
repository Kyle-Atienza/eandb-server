const { ProductItem } = require("../models/product");
const asyncHandler = require("express-async-handler");
import { Response, NextFunction } from "express";

const checkProductExist = asyncHandler(
  async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.body.productId) {
        res.status(400);
        throw new Error("Product is not provided");
      }

      const product = await ProductItem.findById(req.body.productId);

      if (!product) {
        res.status(400);
        throw new Error("Product does not exist");
      }

      next();
    } catch (error) {
      res.status(400);
      throw new Error("Product does not exist");
    }
  }
);

export { checkProductExist };
