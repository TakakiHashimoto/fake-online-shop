import { Response } from "express";
import { AuthRequest } from "../types/type";
import orderService from "../services/order.service";
import mongoose from "mongoose";

async function getOrders(req: AuthRequest, res: Response) {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ ok: false, message: "User is not authenticated" });
  }

  try {
    const userId = user.id;

    const orders = await orderService.getAllOrders(userId);

    return res.status(200).json({ ok: true, data: { order: orders } });
  } catch (e) {
    console.error("Failed to fetch user's orders", e);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to fetch user's orders" });
  }
}

async function getOrderById(req: AuthRequest, res: Response) {
  const user = req.user;
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ ok: false, message: "Invalid order id" });
  }

  if (!id) {
    return res
      .status(400)
      .json({ ok: false, message: "Parameters are required" });
  }

  if (!user) {
    return res
      .status(401)
      .json({ ok: false, message: "User is not authenticated" });
  }

  try {
    const order = await orderService.getOrderById(id, user.id);
    if (!order) {
      return res.status(404).json({ ok: false, message: "Order not found" });
    }

    return res.status(200).json({ ok: true, data: { order } });
  } catch (e) {
    console.error("Failed to fetch an order", e);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to fetch an order" });
  }
}

async function createOrder(req: AuthRequest, res: Response) {
  const user = req.user;
  const body = req.body;
  // { items : [{productId: "productId1", quantity: 2}, {productId: "productId2", quantity: 1}, ...]}

  if (!user) {
    return res
      .status(401)
      .json({ ok: false, message: "User is not authenticated" });
  }

  try {
    // validate inputs
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return res
        .status(400)
        .json({ ok: false, message: "Order must have at least one item" });
    }
    for (const item of body.items) {
      if (!item.productId) {
        return res
          .status(400)
          .json({ ok: false, message: "Product Id is required" });
      }

      if (
        typeof item.quantity !== "number" ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res
          .status(400)
          .json({ ok: false, message: "Quantity must be positive ineteger" });
      }
    }

    const createdOrder = await orderService.createOrder(user.id, body);

    return res.status(201).json({ ok: true, data: { order: createdOrder } });
  } catch (e) {
    console.error("Failed to create an order", e);

    return res
      .status(500)
      .json({ ok: false, message: "Failed to create an order" });
  }
}

async function cancelOrder(req: AuthRequest, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  const user = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ ok: false, message: "Invalid order id" });
  }

  if (!user) {
    return res
      .status(401)
      .json({ ok: false, message: "User is not authenticated" });
  }

  try {
    const cancelledOrder = await orderService.cancelOrder(id, user.id);

    if (!cancelledOrder) {
      return res.status(404).json({ ok: false, message: "Order not found" });
    }

    return res.status(200).json({ ok: true, data: { order: cancelledOrder } });
  } catch (e) {
    console.error("Failed to cancel your order", e);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to cancel your order" });
  }
}

export default { getOrders, getOrderById, createOrder, cancelOrder };
