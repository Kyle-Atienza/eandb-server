"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getProducts, getProductItems, getProductList, createProduct, script, } = require("../controllers/product");
router.get("/", getProducts);
router.get("/items", getProductItems);
router.get("/list", getProductList);
router.post("/", createProduct);
router.get("/script", script);
module.exports = router;
