import express from "express";
const router = express.Router();

const {
  getProducts,
  getProductItems,
  createProduct,
  script,
} = require("../controllers/product");

router.get("/", getProducts);
router.get("/items", getProductItems);
router.post("/", createProduct);

router.get("/script", script);

module.exports = router;
