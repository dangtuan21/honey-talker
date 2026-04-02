import dotenv from "dotenv";

dotenv.config();

export const env = {
  MONGODB_URL: process.env.MONGODB_URL || "",
  DATABASE_NAME: process.env.DATABASE_NAME || "talkerdb",
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_HOST: process.env.DATABASE_HOST,
  PORT: Number(process.env.PORT) || 3000,
  HOST: process.env.HOST || "0.0.0.0",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
} as const;

if (!env.MONGODB_URL) {
  throw new Error("Missing MONGODB_URL in environment");
}
