import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function connectMongodb() {
  const mongoUri = process.env.MONGODB_URI?.trim();
  if (!mongoUri) {
    throw new Error(
      "MONGODB_URI is missing. Set it in .env.local or .env before connecting to MongoDB.",
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUri)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((err) => {
        throw err
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongodb;
