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
router.get("/item/:id", getProductItem);
router.get("/list", getProductList);
// router.get("/list/:group", getProductList);
router.get("/list2", getProductList);
router.post("/", createProduct);

router.get("/script", script);

module.exports = router;
