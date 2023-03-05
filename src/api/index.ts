import { Router } from "express";
import { authRouter } from "./routes/auth";
import { profileRouter } from "./routes/profile";

export const router = Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
