"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require("cors");
const error_1 = require("./middlewares/error");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");
connectDB();
app.use(cors());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/products", require("./routes/product"));
app.use("/users", require("./routes/user"));
app.use("/orders", require("./routes/order"));
app.use("/pay", require("./routes/order"));
app.use(error_1.errorHandler);
app.listen(port, () => {
    console.log(`[server]: Server is listening at port: ${port}`);
});
