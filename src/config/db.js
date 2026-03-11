const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");

// module.exports = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("DB connection failed:", err.message);
//     process.exit(1);
//   }
// };

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

module.exports = connectDB;
