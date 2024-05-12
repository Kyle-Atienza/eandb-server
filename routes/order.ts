import express from "express";
const router = express.Router();

const { protect } = require("../middlewares/auth");
const { checkProductExist } = require("../middlewares/product");
const {
  getCart,
  getOrders,
  add,
  remove,
  createAddress,
  getAdresses,
} = require("../controllers/order");

router.get("/", protect, getOrders);
router.get("/cart", protect, getCart);
router.post("/cart/add", protect, checkProductExist, add);
router.post("/cart/remove", protect, checkProductExist, remove);

router.post("/address", protect, createAddress);
router.get("/address", protect, getAdresses);

module.exports = router;
