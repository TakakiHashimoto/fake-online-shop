import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import orderController from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.get("/my-orders", requireAuth, orderController.getOrders);
orderRouter.post(
  "/",
  requireAuth,
  requireRole("customer"),
  orderController.createOrder,
);
orderRouter.get(
  "/:id",
  requireAuth,
  requireRole("customer"),
  orderController.getOrderById,
);
orderRouter.patch(
  "/:id/cancel",
  requireAuth,
  requireRole("customer"),
  orderController.cancelOrder,
);

export default orderRouter;
