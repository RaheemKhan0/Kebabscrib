import mongoose from "mongoose";
import "dotenv/config"; // Load environment variables from .env.local file

const MONGODB_USERS_URI = process.env.MONGODB_USERS_URI;

if (!MONGODB_USERS_URI) {
  throw new Error("Please define the MONGODB_USERS_URI environment variable inside .env.local");
}

let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function connectUserDataBase() {
  if (cached.conn) {
    console.log("Returning cached connection - Raheem");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_USERS_URI).then((mongoose) => {
      console.log("Connection Successful - Raheem");
      return mongoose;
    }); // Fixed missing parenthesis here
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectUserDataBase;

