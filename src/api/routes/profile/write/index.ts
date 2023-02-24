import { Router } from "express";
import { profileRouter } from "..";
import { validateToken } from "../../../middleware/validate-token";
import { profileWriteController } from "./write.controller";

export const profileWriteRouter = Router();

profileRouter.use("/write", profileWriteRouter);

profileWriteRouter.get(
  "/",
  validateToken,
  profileWriteController.getProfileWriteProfile
);

profileWriteRouter.patch(
  "/",
  validateToken,
  profileWriteController.profileWriteProfile
);
