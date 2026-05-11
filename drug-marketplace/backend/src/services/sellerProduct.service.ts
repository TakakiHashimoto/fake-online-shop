import { IProduct, Product } from "../models/products.model";

// This is specific to a seller
async function createProduct(data: Partial<IProduct>) {
  return await Product.create(data);
}

async function updateProduct(id: string, data: Partial<IProduct>) {
  return await Product.findByIdAndUpdate(id, data, { new: true });
}

async function deleteProduct(id: string) {
  return await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  );
}
