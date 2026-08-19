const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connect_DB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(process.env.DB_URL, opts)
      .then((mongooseInstance) => {
        console.log(
          "Database Connected Successfully @",
          mongooseInstance.connection.host,
        );
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("Error connecting to database:", err.message);
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

module.exports = connect_DB;

