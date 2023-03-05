import { Router } from "express";
import { validateToken } from "../../middleware/validate-token";
import { profileWriteController } from "./profile.controller";

export const profileRouter = Router();

// profileRouter.get("/");

profileRouter.get(
  "/write",
  validateToken,
  profileWriteController.getProfileWriteProfile
);

profileRouter.patch(
  "/write",
  validateToken,
  profileWriteController.profileWriteProfile
);
