import { NextFunction, Request, Response } from "express";
import { JWTHelper } from "../../../../helper/jwt";
import { ProfileService } from "../../../../service/profile";
import { getAccessToken } from "../../../../utils/jwt";
import {
  QueryProfileWriteType,
  PatchProfileWriteRequestType,
} from "@scouit/api-types";

export const profileWriteController = {
  profileWriteProfile: async (
    req: Request<
      {},
      {},
      PatchProfileWriteRequestType,
      { type: QueryProfileWriteType }
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { type } = req.query;
      const profileInstance = new ProfileService();
      const accessToken = getAccessToken(req.headers.authorization);
      const { userId } = new JWTHelper().decodeAccessToken(accessToken);

      await profileInstance.write(type, userId, req.body);
      res.json({});
    } catch (e) {
      next(e);
    }
  },
  getProfileWriteProfile: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const profileInstance = new ProfileService();
      const accessToken = getAccessToken(req.headers.authorization);
      const { userId } = new JWTHelper().decodeAccessToken(accessToken);

      const userProfile = await profileInstance.getById(userId);
      res.json(userProfile);
    } catch (e) {
      next(e);
    }
  },
};
