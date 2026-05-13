import { Product } from "../models/products.model";

// This is public browser page
async function getAllProducts() {
  return await Product.find({ isActive: true });
}

async function getProductById(id: string) {
  return await Product.findOne({ _id: id, isActive: true });
}

export default { getAllProducts, getProductById };
