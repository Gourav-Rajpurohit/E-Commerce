import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URL, {
      dbName: "E-commerce",
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000
    });
  }

  cached.conn = await cached.promise;
  console.log("MongoDB Connected");

  return cached.conn;
};

export default connectDB;
