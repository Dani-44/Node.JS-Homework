import { Router } from "express";
import { tokenValidator } from "../middlewares/token-validator.middleware.js";
import { authRouter } from "../routes/auth.routes.js";
import { characterRouter } from "../routes/characters.routes.js";

export const globalRouter = Router();

globalRouter.use("/", authRouter);
globalRouter.use("/character", tokenValidator, characterRouter);
