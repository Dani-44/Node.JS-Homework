import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { userValidator } from "../middlewares/user-validator.middelware.js";

export const authRouter = Router();

// 1. Register user
authRouter.post("/register", userValidator, AuthController.registerUser);

// 2. Login user
authRouter.post("/login", AuthController.loginUser);

// 3. Refresh access token
authRouter.get("/refresh-token", AuthController.refreshAccessToken);

// 4. Logout user
authRouter.get("/logout", AuthController.logoutUser);
