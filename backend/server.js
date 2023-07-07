import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DB } from "./database.js";
import authRouter from "./route/authRoute.js";
import categoryRouter from "./route/categoryRoute.js";
import productRouter from "./route/productRoute.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

const start = async () => {
  const port = process.env.PORT || 7000;
  await DB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Serving @ port ${port}`));
};

start();
