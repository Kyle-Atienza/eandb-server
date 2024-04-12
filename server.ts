// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");

connectDB();

app.use("/products", require("./routes/productRoutes"));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
