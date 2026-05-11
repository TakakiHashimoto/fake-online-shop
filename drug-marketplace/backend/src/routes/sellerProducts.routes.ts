import { NextFunction, Response, Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import { AuthRequest } from "../types/type";

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
  "/text",
  requireAuth,
  requireRole("seller"),
  (req: AuthRequest, res: Response) => {
    return res
      .status(200)
      .json({ ok: true, message: "Seller route access confirmed" });
  },
);

export default sellerProductRouter;
