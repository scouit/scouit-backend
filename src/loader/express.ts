import { Application, json } from "express";
import { router } from "../api";
import cors from "cors";
import morgan from "morgan";

export const expressLoader = (app: Application) => {
  app.use(json());

  app.use(morgan("dev"));
  app.use(cors());

  app.use("/", router);
  app.get("/status", (req, res) => {
    return res.json({});
  });
};
