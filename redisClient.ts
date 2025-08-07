import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

if (!REDIS_HOST || !REDIS_PORT || !REDIS_PASSWORD) {
	throw new Error("Missing Redis configuration in environment variables");
}

const redis = new Redis({
	host: REDIS_HOST,
	port: parseInt(REDIS_PORT, 10),
	password: REDIS_PASSWORD,
});

redis.on("connect", () => {
	console.log("Redis connected");
});

redis.on("error", (err) => {
	console.error("Redis error:", err);
});

export default redis;
