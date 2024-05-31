import express from "express";
const router = express.Router();

const {
  getProducts,
  getProductItems,
  getProductItem,
  getProductOptions,
  // getProductOptions2,
  createProduct,
  script,
} = require("../controllers/product");

router.get("/", getProducts);
router.get("/items", getProductItems);
router.get("/item/:code", getProductItem);
router.get("/item/:code/:option", getProductItem);
router.get("/options/:group", getProductOptions);
router.post("/", createProduct);

router.get("/script", script);

module.exports = router;
