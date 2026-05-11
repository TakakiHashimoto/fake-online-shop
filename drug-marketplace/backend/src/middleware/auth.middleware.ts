import { Response, NextFunction } from "express";
import { AuthRequest, JwtPayload } from "../types/type";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import userService from "../services/user.service";

// Check weather user is logged in or not
// first, userId is attached in a cookie = user is logged in or signed up => if no userId, can't pass further
// based on the userId, find the user and attach the _id and role for requireRole middleware
// After passing this middleware, everyrequest that needs to pass this middleware has user.id and user.role
async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ ok: false, message: "User is not authenticated" });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET_KEY) as JwtPayload;

    const user = await userService.getUserById(payload.userId);

    if (!user) {
      return res
        .status(401)
        .json({ ok: false, message: "User is not authenticated" });
    }

    req.user = { id: user._id.toString(), role: user.role };

    next();
  } catch (e) {
    console.error("Invalied Token", e);
    return res.status(401).json({ ok: false, message: "Invalid Token" });
  }
}

// async function requireRole(
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction,
//   userRole: "customer" | "seller",
// ) {
//   if (!req.user) {
//     return res
//       .status(401)
//       .json({ ok: false, message: "User is not authenticated" });
//   }

//   if (req.user.role !== userRole) {
//     return res
//       .status(403)
//       .json({
//         ok: false,
//         message: "You don't have permission to access this resource",
//       });
//   }

//   next();
// }

// Check weather user is a seller or not
// it first needs to clear requireAuth.

function requireRole(userRole: "customer" | "seller") {
  return function (req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.user) {
      return res
        .status(401)
        .json({ ok: false, message: "User is not authenticated" });
    }

    if (req.user.role !== userRole) {
      return res
        .status(403)
        .json({ ok: false, message: "You don't have access to this resource" });
    }

    next();
  };
}

export { requireAuth, requireRole };
