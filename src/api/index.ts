import { Router } from "express";
import { authRouter } from "./routes/auth";
import { profileRouter } from "./routes/profile";
import { profileWriteRouter } from "./routes/profile/write";

export const router = Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/profile/write", profileWriteRouter);
