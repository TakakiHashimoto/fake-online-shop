import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { env } from "../config/env";
import userService from "../services/user.service";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/type";

// ########################################## SIGNUP #########################################################
async function signupUser(req: Request, res: Response) {
  const { username, email, password, role } = req.body;

  try {
    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res
        .status(400)
        .json({ ok: false, message: "Email, username, password are required" });
    }

    const safeRole = role === "seller" ? "seller" : "customer";

    const hashedPassword = await bcrypt.hash(password, env.SALT_NUMBER);

    const data = await userService.createUser({
      username,
      email,
      hashedPassword,
      role: safeRole,
    });

    const payload = { userId: data._id };

    const token = jwt.sign(payload, env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.ENVIRONMENT === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res
      .status(201)
      .json({
        ok: true,
        message: "Successfully created a user",
        user: {
          id: data._id,
          username: data.username,
          email: data.email,
          role: data.role,
        },
      });
  } catch (e) {
    console.error(e);
    if ((e as any).code === 11000) {
      return res
        .status(409)
        .json({ ok: false, message: "Email is already registered" });
    }

    return res
      .status(500)
      .json({ ok: false, message: "Failed to create a user" });
  }
}

// ########################################## LOGIN #########################################################
async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (typeof email !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ ok: false, message: "Email, username, password are required" });
    }
    const foundUser = await userService.getUserByEmail(email);
    if (!foundUser) {
      return res
        .status(401)
        .json({ ok: false, message: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.hashedPassword);
    if (!isMatch) {
      return res
        .status(401)
        .json({ ok: false, message: "Email or password is incorrect" });
    }

    const payload = { userId: foundUser._id };
    const token = jwt.sign(payload, env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.ENVIRONMENT === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res
      .status(200)
      .json({
        ok: true,
        message: "Login successfull",
        user: {
          id: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role,
        },
      });
  } catch (e) {
    console.error("Failed to login user", e);

    return res.status(500).json({ ok: false, message: "Failed to login user" });
  }
}

// ########################################## LOGOUT #######################################################
async function logoutUser(req: Request, res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: env.ENVIRONMENT === "production",
    sameSite: "lax",
  });
  return res
    .status(200)
    .json({ ok: true, message: "Successfully logged out uer" });
}

// ########################################## GETME #######################################################
async function getMe(req: AuthRequest, res: Response) {
  const user = req.user;
  if (!user) {
    return res
      .status(403)
      .json({ ok: false, message: "User is not authenticated" });
  }

  const userId = user.id;
  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({
        ok: true,
        message: "User found",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
  } catch (e) {
    console.error("Failed to fetch user", e);
    return res.status(500).json({ ok: false, message: "Failed to fetch user" });
  }
}

export default { signupUser, loginUser, logoutUser, getMe };
