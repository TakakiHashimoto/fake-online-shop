import mongoose, { Schema, Types } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  imgUrl?: string;
  stock: number;
  sellerId: Types.ObjectId;
  isActive: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    imgUrl: { type: String, trim: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    }, // ref = referencing User table
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

export const Product = mongoose.model<IProduct>("Products", productSchema);
