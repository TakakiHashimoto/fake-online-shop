import mongoose, { Schema } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  hashedPassword: string;
  role: "customer" | "seller";
}

// defining model for database schema
const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    hashedPassword: { type: String, required: true },
    role: {
      type: String,
      enum: ["seller", "customer"],
      required: true,
      default: "customer",
    },
  },
  { timestamps: true },
);

// this is a tool to operate CRUD
export const User = mongoose.model("User", UserSchema);
