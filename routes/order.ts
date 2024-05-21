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
  updateAddress,
  deleteAddress,
  getAddresses,
} = require("../controllers/order");

router.get("/", protect, getOrders);
router.get("/cart", protect, getCart);
router.post("/cart/add", protect, checkProductExist, add);
router.post("/cart/remove", protect, checkProductExist, remove);

router.post("/address", protect, createAddress);
router.put("/address/:id", protect, updateAddress);
router.delete("/address/:id", protect, deleteAddress);
router.get("/address", protect, getAddresses);

module.exports = router;
