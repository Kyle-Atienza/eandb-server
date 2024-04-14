import express from "express";
const router = express.Router();

const { protect } = require("../middlewares/auth");
const { checkProductExist } = require("../middlewares/product");
const { getOrders, add, remove } = require("../controllers/order");

router.get("/", protect, getOrders);
router.post("/cart/add", protect, checkProductExist, add);
router.post("/cart/remove", protect, checkProductExist, remove);

module.exports = router;
