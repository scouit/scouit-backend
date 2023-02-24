import { Router } from "express";
import { createUser, handlerSignIn } from "./auth.controller";

export const authRouter = Router();

authRouter.post("/sign-up", createUser);
authRouter.post("/sign-in", handlerSignIn);
