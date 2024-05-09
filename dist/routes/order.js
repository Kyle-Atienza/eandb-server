"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { protect } = require("../middlewares/auth");
const { checkProductExist } = require("../middlewares/product");
const { getCart, getOrders, add, remove } = require("../controllers/order");
router.get("/", protect, getOrders);
router.get("/cart", protect, getCart);
router.post("/cart/add", protect, checkProductExist, add);
router.post("/cart/remove", protect, checkProductExist, remove);
module.exports = router;
