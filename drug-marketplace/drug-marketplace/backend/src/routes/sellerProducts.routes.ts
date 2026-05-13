import { NextFunction, Response, Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import { AuthRequest } from "../types/type";
import sellerProductController from "../controllers/sellerProduct.controller";

const sellerProductRouter = Router();

// You can do this, but the second one is more ideal
// sellerProductRouter.get(
//   "/test",
//   requireAuth,
//   (req: AuthRequest, res: Response, next: NextFunction) =>
//     requireRole(req, res, next, "seller"),
//   (req: AuthRequest, res: Response) => {
//     return res
//       .status(200)
//       .json({ ok: true, message: "Seller route access confirmed" });
//   },
// );

sellerProductRouter.get(
  "/test",
  requireAuth,
  requireRole("seller"),
  (req: AuthRequest, res: Response) => {
    return res
      .status(200)
      .json({ ok: true, message: "Seller route access confirmed" });
  },
);

sellerProductRouter.get(
  "/",
  requireAuth,
  requireRole("seller"),
  sellerProductController.getAllSellerProducts,
);
sellerProductRouter.post(
  "/",
  requireAuth,
  requireRole("seller"),
  sellerProductController.createProduct,
);
sellerProductRouter.patch(
  "/:id",
  requireAuth,
  requireRole("seller"),
  sellerProductController.editProduct,
);
sellerProductRouter.delete(
  "/:id",
  requireAuth,
  requireRole("seller"),
  sellerProductController.removeProduct,
);

export default sellerProductRouter;
