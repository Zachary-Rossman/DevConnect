import mongoose from "mongoose";

/**
 * =========================================================
 * MONGODB CONNECTION LAYER (Mongoose)
 * =========================================================
 *
 * PURPOSE:
 * This file is responsible for creating and managing a
 * single MongoDB connection using Mongoose.
 *
 * WHY THIS EXISTS:
 * - Next.js runs in serverless / hot-reload environments
 * - Without this guard, multiple connections would be created
 *   on every request or reload (bad performance + errors)
 *
 * STRATEGY USED:
 * We check mongoose.connection.readyState before connecting
 * to ensure we only connect once per runtime instance.
 *
 * =========================================================
 */

/**
 * Environment variable holding MongoDB connection string.
 * This should be defined in `.env.local`.
 *
 * Example:
 * MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/db"
 */
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Safety check:
 * If the environment variable is missing, we throw immediately
 * so the app fails fast instead of silently breaking later.
 */
if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

/**
 * =========================================================
 * connectDB()
 * =========================================================
 *
 * WHAT IT DOES:
 * Ensures a MongoDB connection is established before any
 * database operations are performed.
 *
 * HOW IT WORKS:
 * 1. Checks mongoose.connection.readyState
 *    - 0 = disconnected
 *    - 1 = connected
 *    - 2 = connecting
 *    - 3 = disconnecting
 *
 * 2. If already connected (>= 1), we exit early
 *
 * 3. Otherwise, we establish a new connection
 *
 * WHY THIS PATTERN MATTERS:
 * Prevents multiple DB connections in Next.js dev mode
 * and avoids connection exhaustion in production.
 *
 * =========================================================
 */
export async function connectDB() {
  // If already connected or connecting, reuse existing connection
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  // Otherwise establish a new connection
  await mongoose.connect(MONGODB_URI as string);
}