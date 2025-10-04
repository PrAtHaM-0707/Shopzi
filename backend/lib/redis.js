import Redis from "ioredis";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("backend/.env") });

if (!process.env.UPSTASH_REDIS_URL) {
  throw new Error("UPSTASH_REDIS_URL is missing in .env");
}

export const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
  tls: {},
  maxRetriesPerRequest: 5,
});

redis.on("connect", () => console.log("Redis connected successfully"));
redis.on("error", (err) => console.error("Redis error:", err));
