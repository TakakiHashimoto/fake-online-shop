import { Order } from "../models/order.model";
import { Product } from "../models/products.model";

type CreateOrderItem = { productId: string; quantity: number };

type CreateOrder = { items: CreateOrderItem[] };

async function getAllOrders(customerId: string) {
  return await Order.find({ customerId: customerId }).sort({ createdAt: -1 });
}

async function getOrderById(orderId: string, customerId: string) {
  return await Order.findOne({ _id: orderId, customerId });
}

async function createOrder(customerId: string, data: CreateOrder) {
  // First validate inputs
  if (!data.items || data.items.length === 0) {
    throw new Error("Order must have at least one item");
  }

  for (const item of data.items) {
    if (!item.productId) {
      throw new Error("Product Id is required");
    }

    if (
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
    ) {
      throw new Error("Quantity must be positive integer");
    }
  }

  // fetch the matching items from database
  // 1. Customer sends product IDs and quantities.
  // 2. Backend fetches real products from MongoDB.
  // 3. Backend creates productMap: productId → product.
  // 4. For each cart item, backend finds the real product by ID.
  // 5. Backend builds trusted order items using real database values.

  const productIds = data.items.map((item) => item.productId); // List of productIds customer put in a cart
  const products = await Product.find({
    _id: { $in: productIds },
    isActive: true,
  });

  const productMap = new Map(
    products.map((product) => [product._id.toString(), product]),
  );

  // Map {"aaa111" => { _id: ObjectId("aaa111"), name: "Moon Dust Candy", price: 10, stock: 5, sellerId: ObjectId("seller1"), isActive: true,},

  // "bbb222" => { _id: ObjectId("bbb222"), name: "Goblin Energy Syrup", price: 20, stock: 3,sellerId: ObjectId("seller2"), isActive: true,}}

  const items = data.items.map((item) => {
    const product = productMap.get(item.productId);

    if (!product) {
      throw new Error("Product not found or inactive");
    }

    if (product.stock < item.quantity) {
      throw new Error(`Not enough stock for ${product.name}`);
    }

    return {
      productId: product._id,
      sellerId: product.sellerId,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      imgUrl: product.imgUrl,
    };
  });

  const totalAmount = items.reduce((total, cur) => {
    return total + cur.price * cur.quantity;
  }, 0);

  const order = { customerId, items, totalAmount, status: "pending" as const };

  return await Order.create(order);
}

async function cancelOrder(orderId: string, customerId: string) {
  return await Order.findOneAndUpdate(
    { _id: orderId, customerId, status: "pending" },
    { status: "cancelled" },
    { new: true, runValidators: true },
  );
}

export default { getAllOrders, getOrderById, createOrder, cancelOrder };
