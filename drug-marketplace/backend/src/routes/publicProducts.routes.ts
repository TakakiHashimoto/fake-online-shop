import { Router } from "express";
import productController from "../controllers/product.controller";

const publicProductsRouter = Router();

publicProductsRouter.get("/", productController.fetchProducts);
publicProductsRouter.get("/:id", productController.fetchProductById);

export default publicProductsRouter;
