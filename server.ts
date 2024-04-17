// src/index.js
import express, { Express } from "express";
import dotenv from "dotenv";
const cors = require("cors");

import { errorHandler } from "./middlewares/error";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");

connectDB();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/products", require("./routes/product"));
app.use("/users", require("./routes/user"));
app.use("/orders", require("./routes/order"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
