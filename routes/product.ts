import express from "express";
const router = express.Router();

const {
  getProducts,
  getProductItems,
  getProductList,
  createProduct,
  script,
} = require("../controllers/product");

router.get("/", getProducts);
router.get("/items", getProductItems);
router.get("/list", getProductList);
router.post("/", createProduct);

router.get("/script", script);

module.exports = router;
