// customerId     → who bought
// items          → what they bought => list of order items
// totalAmount    → final total
// status         → order progress
// timestamps     → when it happened

import mongoose, { Schema, Types } from "mongoose";

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export type IOrderItem = {
  productId: Types.ObjectId;
  sellerId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  imgUrl?: string;
};

export type IOrder = {
  customerId: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
};

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    imgUrl: { type: String, trim: true },
  },
  { _id: false },
);

const OrderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: function (items: IOrderItem[]) {
          return items.length > 0;
        },
        message: "Order must have at least one item",
      },
    },

    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      required: true,
      default: "pending",
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
