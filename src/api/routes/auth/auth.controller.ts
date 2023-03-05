import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../../service/auth";
import {
  PostSignUpReqeustType,
  PostSignInReqeustType,
} from "@scouit/api-types";

export const createUser = async (
  req: Request<{}, {}, PostSignUpReqeustType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userInfo = req.body;
    const authInstance = new AuthService();
    await authInstance.signup(userInfo);
    res.json({});
  } catch (e) {
    next(e);
  }
};

export const signIn = async (
  req: Request<{}, {}, PostSignInReqeustType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userInfo = req.body;
    const authInstance = new AuthService();
    const { access_token, refresh_token } = await authInstance.signIn(userInfo);
    res.json({ access_token, refresh_token });
  } catch (e) {
    next(e);
  }
};
