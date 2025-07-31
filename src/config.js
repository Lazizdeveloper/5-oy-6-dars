import dotenv from "dotenv";
dotenv.config();

export const serverConfig = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
  DB_URI: process.env.dbUri || "mongodb://localhost:27017/lesson6",
};