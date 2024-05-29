import express from "express";
const router = express.Router();

const {
  getProducts,
  getProductItems,
  getProductItem,
  getProductList,
  // getProductList2,
  createProduct,
  script,
} = require("../controllers/product");

router.get("/", getProducts);
router.get("/items", getProductItems);
router.get("/item/:code", getProductItem);
router.get("/list", getProductList);
router.post("/", createProduct);

router.get("/script", script);

module.exports = router;
