import { Router } from "express";
import userController from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.post("/login", userController.loginUser);
userRouter.post("/register", userController.signupUser);
userRouter.post("/logout", userController.logoutUser);
userRouter.get("/me", requireAuth, userController.getMe);

export default userRouter;
