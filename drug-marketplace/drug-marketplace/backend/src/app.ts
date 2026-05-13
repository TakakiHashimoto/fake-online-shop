import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
config();

import { env } from "./config/env";
import userRouter from "./routes/auth.routes";
import sellerProductRouter from "./routes/sellerProducts.routes";
import publicProductsRouter from "./routes/publicProducts.routes";
import orderRouter from "./routes/order.routes";

const app = express();

app.use(express.json());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/products", publicProductsRouter);
app.use("/api/seller/products", sellerProductRouter);
app.use("/api/orders", orderRouter);

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ ok: true, message: "Health Check confirmed" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ ok: false, error: "Route Not Found" });
});

export default app;
