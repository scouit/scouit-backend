import dotenv from "dotenv";
import { Algorithm } from "jsonwebtoken";

const envFound = dotenv.config();

interface ConfigType {
  port: string;
  jwt: {
    algorithm: Algorithm;
    secret: string;
    expire: {
      access: number;
      refresh: number;
    };
  };
}

export const config: ConfigType = {
  port: process.env.PORT || "8080",
  jwt: {
    algorithm: (process.env.JWT_ALGORITHM as Algorithm) || "HS256",
    secret: process.env.JWT_SECRET || "",
    expire: {
      access: parseFloat(process.env.JWT_EXPIRE_ACCESS || "0"),
      refresh: parseFloat(process.env.JWT_EXPIRE_REFRESH || "0"),
    },
  },
};
