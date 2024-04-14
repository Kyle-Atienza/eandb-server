import express from "express";
const router = express.Router();

const { getProducts, createProduct } = require("../controllers/product");

router.get("/", getProducts);
router.post("/", createProduct);

module.exports = router;
