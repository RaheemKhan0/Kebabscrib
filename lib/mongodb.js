import mongoose from "mongoose";
import "dotenv/config"; // Load environment variables from .env.local
const dotenv = await import("dotenv");
dotenv.config({ path: ".env.local" }); // Explicitly load .env.local

const MONGODB_URI = process.env.LOCAL_URI;


if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function connectMongodb() {
  // If cached.conn (an existing active connection) exists,
  // it is returned directly to avoid re-connecting to the database.
  if (cached.conn) {
    console.log("Returning cached connection - RABIE");
    return cached.conn;
  }

  // If there is no cached.promise (no ongoing connection process)
  // It sets up a new promise for connecting to MongoDB using mongoose.connect()
  if (!cached.promise) {
    // Options for new connection
    // const opts = {
    //     useNewUrlParser: true, // Uses the new MongoDB connection string parser.
    //     useUnifiedTopology: true, // Enables the new Server Discover and Monitoring engine
    // }

    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("Connection Succesfull - RABIE");
      return mongoose;
    });

    cached.conn = await cached.promise; // Wait for promise to come and then assign the connection
    console.log("Connection Succesfull - RABIE");
    return cached.conn;
  }
}

// This allows the function to be imported and used in other files
// (e.g., API routes) to connect to MongoDB without worrying
// about duplicate connections.
export default connectMongodb;
