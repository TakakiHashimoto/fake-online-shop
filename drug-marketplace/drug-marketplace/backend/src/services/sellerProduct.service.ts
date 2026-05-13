import { IProduct, Product } from "../models/products.model";

// This is specific to a seller

async function findAllSellerProducts(sellerId: string) {
  return await Product.find({ sellerId });
}

async function findProductById(productId: string, sellerId: string) {
  return await Product.findOne({ _id: productId, sellerId });
}

async function createProduct(data: Partial<IProduct>) {
  return await Product.create(data);
}

async function updateProduct(
  productId: string,
  sellerId: string,
  data: Partial<IProduct>,
) {
  return await Product.findOneAndUpdate(
    { _id: productId, sellerId: sellerId },
    data,
    { new: true, runValidators: true },
  );
}

async function deleteProduct(productId: string, sellerId: string) {
  return await Product.findOneAndUpdate(
    { _id: productId, sellerId },
    { isActive: false },
    { new: true, runValidators: true },
  );
}

export default {
  findAllSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  findProductById,
};
