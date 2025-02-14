import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: "redis://red-cunmgldumphs73bof3q0:6379",
});

// const redisClient = createClient({
//   url: "redis://host:6379",
// });

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
})();

export default redisClient;
