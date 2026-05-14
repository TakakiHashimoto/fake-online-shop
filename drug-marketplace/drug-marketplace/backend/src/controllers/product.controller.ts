import { Request, Response } from "express";
import { Types } from "mongoose";
import productService from "../services/product.service";

async function fetchProducts(req: Request, res: Response) {
  try {
    const allProducts = await productService.getAllProducts();
    return res.status(200).json({ ok: true, data: { products: allProducts } });
  } catch (e) {
    console.error("Failed to fetch products", e);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to fetch products" });
  }
}

async function fetchProductById(req: Request, res: Response) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ ok: false, message: "Invalid product id" });
  }

  try {
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ ok: false, message: "Product not found" });
    }

    return res.status(200).json({ ok: true, data: { product: product } });
  } catch (e) {
    console.error("Failed to fetch product", e);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to fetch product" });
  }
}

export default { fetchProducts, fetchProductById };
