import { Response } from "express";
import { Types } from "mongoose";
import { AuthRequest } from "../types/type";
import sellerProductService from "../services/sellerProduct.service";

async function getAllSellerProducts(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res
      .status(401)
      .json({ ok: false, message: "You are not authenticated" });
  }

  if (req.user.role !== "seller") {
    return res
      .status(403)
      .json({ ok: false, message: "You are not authorized" });
  }

  try {
    const products = await sellerProductService.findAllSellerProducts(
      req.user.id,
    );

    return res.status(200).json({ ok: true, data: { products: products } });
  } catch (e) {
    console.error("Failed to fetch seller's products", e);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to fetch seller's products" });
  }
}

async function createProduct(req: AuthRequest, res: Response) {
  const { name, description, price, imgUrl, stock } = req.body;
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ ok: false, message: "User is not authenticated" });
  }

  if (user.role !== "seller") {
    return res
      .status(403)
      .json({ ok: false, message: "User is not authorized" });
  }

  try {
    if (
      typeof name !== "string" ||
      name.trim() === "" ||
      typeof description !== "string" ||
      description.trim() === "" ||
      typeof price !== "number" ||
      price < 0 ||
      typeof stock !== "number" ||
      stock < 0
    ) {
      return res
        .status(400)
        .json({
          ok: false,
          message: "name, price, stock and description are required fields",
        });
    }

    // if imgUrl is provided and  it wasn't a string
    if (imgUrl !== undefined && typeof imgUrl !== "string") {
      return res
        .status(400)
        .json({ ok: false, message: "imgUrl must be a string" });
    }

    const product = await sellerProductService.createProduct({
      name: name.trim(),
      description: description.trim(),
      price,
      imgUrl: imgUrl?.trim(),
      stock,
      sellerId: new Types.ObjectId(user.id),
    });

    return res.status(201).json({ ok: true, data: { product } });
  } catch (e) {
    console.error("Failed to create a product", e);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to create a product" });
  }
}

async function editProduct(req: AuthRequest, res: Response) {
  const { name, description, price, imgUrl, stock } = req.body;
  const user = req.user;
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ ok: false, message: "Invalid product id" });
  }

  if (!user) {
    return res
      .status(401)
      .json({ ok: false, message: "You are not authenticated" });
  }

  if (user.role !== "seller") {
    return res
      .status(403)
      .json({ ok: false, message: "You are not authorized" });
  }

  try {
    const updateData: {
      name?: string;
      description?: string;
      price?: number;
      imgUrl?: string;
      stock?: number;
    } = {};

    // if name is provided and valid value
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim() === "") {
        return res
          .status(400)
          .json({ ok: false, message: "Name must be a non-empty string" });
      }

      updateData.name = name.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string" || description.trim() === "") {
        return res
          .status(400)
          .json({
            ok: false,
            message: "Description must be a non-empty string",
          });
      }

      updateData.description = description.trim();
    }

    if (price !== undefined) {
      if (typeof price !== "number" || price < 0) {
        return res
          .status(400)
          .json({ ok: false, message: "Price must be a non-negative number" });
      }

      updateData.price = price;
    }

    if (stock !== undefined) {
      if (typeof stock !== "number" || stock < 0) {
        return res
          .status(400)
          .json({ ok: false, message: "Stock must be a non-negative number" });
      }

      updateData.stock = stock;
    }

    if (imgUrl !== undefined) {
      if (typeof imgUrl !== "string") {
        return res
          .status(400)
          .json({ ok: false, message: "imgUrl must be a string" });
      }

      updateData.imgUrl = imgUrl.trim();
    }

    const updatedProduct = await sellerProductService.updateProduct(
      id,
      user.id,
      updateData,
    );

    if (!updatedProduct) {
      return res.status(404).json({ ok: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({ ok: true, data: { product: updatedProduct } });
  } catch (e) {
    console.error("Failed to update a product", e);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to update a product" });
  }
}

async function removeProduct(req: AuthRequest, res: Response) {
  // seller id and produc id needs to match
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ ok: false, message: "Invalid product id" });
  }

  if (!req.user) {
    return res
      .status(401)
      .json({ ok: false, message: "You are not authenticated" });
  }

  if (req.user.role !== "seller") {
    return res
      .status(403)
      .json({ ok: false, message: "You are not authorized" });
  }

  try {
    const deletedItem = await sellerProductService.deleteProduct(
      id,
      req.user.id,
    );

    if (!deletedItem) {
      return res.status(404).json({ ok: false, message: "Product not found" });
    }

    return res.status(200).json({ ok: true, data: { product: deletedItem } });
  } catch (e) {
    console.error("Failed to delete a product", e);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to delete a product" });
  }
}

export default {
  createProduct,
  editProduct,
  removeProduct,
  getAllSellerProducts,
};
