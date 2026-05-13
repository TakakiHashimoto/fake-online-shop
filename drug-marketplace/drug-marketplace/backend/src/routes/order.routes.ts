import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import orderController from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.get("/my-orders", requireAuth, orderController.getOrders);
orderRouter.post("/", requireAuth, orderController.createOrder);
orderRouter.get("/:id", requireAuth, orderController.getOrderById);
orderRouter.post("/:id", requireAuth, orderController.cancelOrder);

export default orderRouter;
